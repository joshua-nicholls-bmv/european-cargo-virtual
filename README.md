# European Cargo Virtual — first release

A complete, dependency-free static website for GitHub Pages or any static host.

## Files

- `index.html` — Home
- `about.html`, `fleet.html`, `network.html`, `operations.html`, `join.html`
- `assets/images/` — original supplied logo and six supplied aircraft images
- `assets/css/main.css` — shared responsive styling
- `assets/js/main.js` — mobile menu and footer year
- `.nojekyll` — bypasses Jekyll processing on GitHub Pages

All links and assets use relative paths. No build, account, API keys, external font service or package installation is required. You can open `index.html` directly for local testing.

## Deploy to GitHub Pages

1. Extract the ZIP. Create a GitHub repository, for example `european-cargo-virtual`.
2. Upload the **contents** of this folder to the repository root: `index.html` must be at the root, alongside the other pages and `assets/`. Preserve the folder structure and include `.nojekyll`.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main`, and choose **/(root)**. Save.
5. When GitHub reports the deployment complete, open `https://joshua-nicholls-bmv.github.io/european-cargo-virtual/` (substitute your username and repository name).
6. Check each page and the mobile navigation. The same files can later be uploaded to another static host without changing paths.

If the repository is named `YOUR-USERNAME.github.io`, the site runs at the domain root. For a custom domain later, configure that domain in GitHub Pages and follow GitHub's DNS instructions; a `CNAME` file is deliberately not included because the domain is not yet known.

## Release 1.3 — recruitment and operating details

Recruitment is open via https://discord.gg/XrmaPKMmn. Join includes confirmed requirements and the five-step application process. About includes Dylan Barlow (ECV Founder & Manager), Josh (BMG Management, Systems & Website) and Richie (BMG Management). All 28 sectors are active and open to all A340 variants. Primary cargo aircraft: A340-600F and A340-500F; Aerosoft and iniBuilds A340 add-ons are accepted per ECV management. The registration roster retains its previously supplied designations.

Livery links, detailed SOPs and charter rules remain pending. Applications are managed in Discord, not through this static website.

## Release 1.2 — Group ACARS

ECV uses British Midland Group ACARS. Operations and Join now explain SimBrief import, dispatch briefing, MSFS connection, flight recording, PIREP submission and Flight History. Home and About also identify the shared Group platform. These features are documented from the Group ACARS project material; no live feed or application connection has been added to this static website.

ACARS access/download links, ECV-specific reporting rules, support contacts and SOPs remain to be supplied.

## Release 1.1 — supplied operating details

- Owner: Dylan. European Cargo Virtual is part of the British Midland Group.
- Simulator: Microsoft Flight Simulator 2024.
- Fleet: 10 aircraft — seven A340-600, two A340-600F, one A340-500; full registrations appear on Fleet.
- UK hubs: Cardiff, Bournemouth, Birmingham and Teesside. Birmingham is included because it appears in the supplied schedule.
- International destinations: Chengdu, Chongqing, Haikou, Ürümqi and Vienna.
- Network: 28 directional sectors transcribed from the supplied Autumn 2026 schedule, with estimated flight durations.

## Confirm before public recruitment

The site clearly identifies itself as an independent flight simulation community. It does not claim affiliation with the real operator.

The supplied imagery and logo are used as provided. Confirm permission to publish these assets before public use. The supplied image set contains duplicates.

Unconfirmed details are intentionally described as pending rather than presented as real company facts:

- Contact details and community links
- Approved simulator add-ons and livery download links
- Charter rules
- Operating handbook, entry criteria, ECV-specific reporting rules and ACARS onboarding/download links
- Pilot counts, flight counts and cargo totals

The homepage statistics describe the confirmed fleet, hubs, schedule and simulator; pilot counts, completed flights and cargo totals remain TBA.

The Join page links to the ECV Discord for applications and onboarding. This static website does not submit applications or collect personal data. Never place private credentials in public files.

## Editing

Each page contains its own semantic navigation and footer, so it remains usable without JavaScript. Update shared navigation/footer details across all six pages. `aria-current="page"` identifies the current page. The mobile menu is collapsible with JavaScript and the navigation stays visible without it.

The palette is defined at the top of `assets/css/main.css`: cargo red `#E30613`, black `#111111`, graphite `#292929`, aircraft white `#F7F7F5`. The provided logo artwork is unchanged. Red is an agreed approximate brand colour, not a claimed official brand specification.

The site uses system fonts to work offline. Change the hero images through the relative image references in the stylesheet. Retain meaningful alternative text when replacing content images.

## Accessibility and release checks

Includes skip navigation, landmark elements, logical headings, keyboard focus indicators, current-page labels, accessible menu state, native expandable FAQ sections, labelled checklist inputs and reduced-motion support.

Before launch, check mobile and desktop layouts, keyboard navigation, all links and final approved copy. No analytics, cookies, application backend or live operational integrations are included.

## Version 2.0 — cargo operator redesign

White-led operator design with compact navigation, a split aircraft hero, route boards, selected sectors, fleet information and a Group ACARS workflow. Inner pages use compact editorial headings and denser content. Fleet includes an accessible aircraft variant selector. All links remain relative and no build is required. The ACARS workflow is explanatory UI, not a live application view.

## Pilot workflow update

ACARS guidance now follows Choose → Plan → Brief → Connect → Fly → Report, including briefing acknowledgement and confirmation of successful PIREP submission. Join retains the public server invite and links directly to the supplied Discord application post; server membership and access are required. Discord post permissions have not been tested through a pilot account.
