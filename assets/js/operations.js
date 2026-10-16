/* Read-only public BMG operations views. No sign-in or private credentials. */
(() => {
  'use strict';
  const base = 'https://eqbaezhcwnjlcnvtfxho.supabase.co/rest/v1/';
  const key = 'sb_publishable__JTXMIQDaruQdmjEmf9t6w_T23MXelW';
  const filter = '(flight_number.ilike.URO*,flight_number.ilike.ECV*)';
  const isECV = flight => /^(URO|ECV)/i.test(String(flight.flight_number || '').trim());
  const el = id => document.getElementById(id);
  const escape = value => String(value ?? '—').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const number = value => value === null || value === undefined || !Number.isFinite(Number(value)) ? '—' : Math.round(Number(value)).toLocaleString('en-GB');
  const date = value => {const d = new Date(value);return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString('en-GB', {timeZone:'UTC', day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) + ' UTC';};
  const duration = minutes => minutes == null ? '—' : `${Math.floor(minutes / 60)}h ${String(Math.round(minutes % 60)).padStart(2,'0')}m`;
  async function read(view, params) {
    const response = await fetch(base + view + '?' + new URLSearchParams(params), {headers:{apikey:key},signal:AbortSignal.timeout(15000)});
    if (!response.ok) throw Error('Public flight data unavailable');
    const data = await response.json();
    if (!Array.isArray(data)) throw Error('Unexpected flight response');
    return data;
  }
  let map, markers, track, flights = [], selected = null, busy = false, lastRecent = 0, fitted = false, trackRequest = 0;
  function position(flight) {
    const lat = Number(flight.latitude), lon = Number(flight.longitude);
    return flight.latitude != null && flight.longitude != null && Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180 ? [lat,lon] : null;
  }
  function setupMap() {
    if (!window.L) {el('map-status').textContent='Map unavailable. Live flight details remain available below.';return;}
    map = L.map('ecv-map').setView([45,40],3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    markers = L.layerGroup().addTo(map);
  }
  function detail(flight) {
    const rows = [['Pilot',flight.pilot_name],['Aircraft',flight.aircraft],['Registration',flight.registration],['Phase',flight.flight_phase],['Altitude',number(flight.altitude)+' ft'],['Ground speed',number(flight.ground_speed)+' kt'],['Last aircraft update',date(flight.updated_at)]];
    el('ecv-selected').innerHTML=`<h3>${escape(flight.flight_number)} · ${escape(flight.departure)} – ${escape(flight.arrival)}</h3><dl class="live-details">${rows.map(([label,value])=>`<div><dt>${label}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>`;
  }
  async function selectFlight(id) {
    const flight = flights.find(f => f.flight_id === id);
    if (!flight) return;
    selected = id; detail(flight);
    el('ecv-flight-list').querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.flight === id)));
    const point = position(flight);
    if (point && map) map.panTo(point);
    if (track && map) {map.removeLayer(track);track=null;}
    const request = ++trackRequest;
    if (!map) return;
    try {
      const points=[];
      for(let offset=0;offset<10000;offset+=500) {
        const batch=await read('flight_track_points',{select:'latitude,longitude,recorded_at',active_flight_id:'eq.'+id,order:'recorded_at.asc,latitude.asc,longitude.asc',offset:String(offset),limit:'500'});
        if(request!==trackRequest || selected!==id)return;
        points.push(...batch.map(position).filter(Boolean));
        if(batch.length<500)break;
      }
      if(points.length>1 && request===trackRequest)track=L.polyline(points,{color:'#e30613',weight:3,interactive:false}).addTo(map);
    } catch { /* Track history is supplementary; current position remains visible. */ }
  }
  function renderLive(data) {
    flights = data.filter(isECV);
    el('ecv-live-count').textContent = flights.length;
    markers?.clearLayers();
    el('ecv-flight-list').replaceChildren();
    if (!flights.length) {
      el('ecv-flight-list').textContent = 'No ECV flights are currently being tracked.';
      el('ecv-selected').textContent = 'Flight details will appear when an ECV flight is active.';
      selected=null;trackRequest++;if(track && map){map.removeLayer(track);track=null;}
    }
    const bounds=[];
    for(const flight of flights) {
      const button=document.createElement('button');button.type='button';button.dataset.flight=flight.flight_id;button.setAttribute('aria-pressed',String(selected===flight.flight_id));
      button.innerHTML=`<strong>${escape(flight.flight_number)}</strong><span>${escape(flight.departure)} – ${escape(flight.arrival)}</span><small>${escape(flight.flight_phase || 'Tracking')} · ${escape(flight.registration)}</small>`;
      button.addEventListener('click',()=>selectFlight(flight.flight_id));el('ecv-flight-list').append(button);
      const point=position(flight);
      if(point && map) {
        bounds.push(point);
        const heading=Number(flight.heading)||0;
        const icon=L.divIcon({className:'ecv-plane',html:`<span style="transform:rotate(${heading-90}deg)" aria-hidden="true">✈</span>`,iconSize:[32,32],iconAnchor:[16,16]});
        const marker=L.marker(point,{icon,title:flight.flight_number,keyboard:true}).addTo(markers);
        marker.bindTooltip(String(flight.flight_number).replace(/[<>&]/g,''));marker.on('click',()=>selectFlight(flight.flight_id));
      }
    }
    if(bounds.length && map && !fitted){map.fitBounds(bounds,{padding:[50,50],maxZoom:6});fitted=true;}
    if(selected && flights.some(f=>f.flight_id===selected))detail(flights.find(f=>f.flight_id===selected));
    else if(flights.length) selectFlight(flights[0].flight_id);
    el('map-status').textContent = flights.length ? 'Select an aircraft or flight to view its details and recorded track.' : 'Map ready · awaiting ECV activity.';
  }
  async function refreshRecent() {
    try {
      const data=(await read('public_recent_operations',{select:'flight_number,pilot_name,departure,arrival,aircraft,registration,block_minutes,landing_rate_fpm,submitted_at',or:filter,order:'submitted_at.desc',limit:'10'})).filter(isECV);
      el('ecv-recent').innerHTML=data.length ? data.map(f=>`<tr><th scope="row">${escape(f.flight_number)}</th><td>${escape(f.departure)} – ${escape(f.arrival)}</td><td>${escape(f.pilot_name)}</td><td>${escape(f.registration)}</td><td>${escape(duration(f.block_minutes))}</td><td>${escape(number(f.landing_rate_fpm))} fpm</td><td>${escape(date(f.submitted_at))}</td></tr>`).join('') : '<tr><td colspan="7">No completed ECV flights have been recorded yet.</td></tr>';
      el('recent-status').textContent='Latest completed ECV reports · updated '+new Date().toLocaleTimeString('en-GB');
      lastRecent=Date.now();
    } catch {el('recent-status').textContent='Recent flight data is temporarily unavailable. Retrying automatically.';}
  }
  async function refresh() {
    if(busy || document.hidden)return;busy=true;
    try {
      const data=await read('public_live_operations',{select:'*',or:filter,order:'flight_number.asc'});
      renderLive(data);el('ecv-live-status').textContent='Connected · refreshed '+new Date().toLocaleTimeString('en-GB');
    } catch {el('ecv-live-status').textContent='Live data unavailable · any displayed positions may be out of date. Retrying automatically.';}
    if(Date.now()-lastRecent>30000)await refreshRecent();
    busy=false;
  }
  setupMap();refresh();
  const timer=setInterval(refresh,5000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
  window.addEventListener('pagehide',()=>clearInterval(timer));
})();
