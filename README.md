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
5. When GitHub reports the deployment complete, open `https://YOUR-USERNAME.github.io/european-cargo-virtual/` (substitute your username and repository name).
6. Check each page and the mobile navigation. The same files can later be uploaded to another static host without changing paths.

If the repository is named `YOUR-USERNAME.github.io`, the site runs at the domain root. For a custom domain later, configure that domain in GitHub Pages and follow GitHub's DNS instructions; a `CNAME` file is deliberately not included because the domain is not yet known.

## Confirm before public recruitment

The site clearly identifies itself as an independent flight simulation community. It does not claim affiliation with the real operator.

The supplied imagery and logo are used as provided. Confirm permission to publish these assets before public use. Two of the supplied night images contain the same image; both originals remain included.

Unconfirmed details are intentionally described as pending rather than presented as real company facts:

- VA leadership, contact details and community links
- Supported simulators, approved aircraft variants, liveries and fleet roster
- Bases, routes, schedules and charter rules
- Operating handbook, entry criteria, dispatch, ACARS and flight reporting
- Pilot counts, flight counts and cargo totals

The homepage statistics describe the website/community identity; they are not live operational statistics.

The Join checklist is local preparation only. It does not submit an application, store data or send messages. Once the official joining URL is available, replace the application-status notice in `join.html` with a clearly labelled link to that URL. Never place private credentials in these public files.

## Editing

Each page contains its own semantic navigation and footer, so it remains usable without JavaScript. Update shared navigation/footer details across all six pages. `aria-current="page"` identifies the current page. The mobile menu is collapsible with JavaScript and the navigation stays visible without it.

The palette is defined at the top of `assets/css/main.css`: cargo red `#E30613`, black `#111111`, graphite `#292929`, aircraft white `#F7F7F5`. The provided logo artwork is unchanged. Red is an agreed approximate brand colour, not a claimed official brand specification.

The site uses system fonts to work offline. Change the hero images through the relative image references in the stylesheet. Retain meaningful alternative text when replacing content images.

## Accessibility and release checks

Includes skip navigation, landmark elements, logical headings, keyboard focus indicators, current-page labels, accessible menu state, native expandable FAQ sections, labelled checklist inputs and reduced-motion support.

Before launch, check mobile and desktop layouts, keyboard navigation, all links and final approved copy. No analytics, cookies, application backend or live operational integrations are included.
