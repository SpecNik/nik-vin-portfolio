# Nikolay Vinokurov — Network & Fibre Infrastructure portfolio

## Production site (English, yellow & black minimalist UI)

Contains 15 project case studies and photos for every project, including the two Donatos images and the updated Nauka-Svyaz logo and cabinet reference. All public CV downloads have been removed. Contact is through email only.

### Deploy to Cloudflare Pages
1. Cloudflare Dashboard → Compute → Workers & Pages → Pages.
2. Upload assets / Create deployment.
3. Drag and drop this ZIP file. If asked for a directory instead, extract the ZIP and upload the contents of the folder (not the outer directory).
4. `index.html`, `styles.css`, `script.js`, and `photos/` must remain at the root.

For an existing Workers project (workers.dev), static-asset deployment screens can differ from Pages.

### Media information
See `MEDIA_MAP.md` and `media-manifest.json`. The logo, generic cable illustrations and shared worker image are labeled as representative, not verified as site-specific project photography. For Mikron, exact assignment of photos to 90 / 180 / 45 nm remains to be confirmed.

Be sure you are authorized to publish photographs taken on client or secure sites.


## Final visual update
The homepage hero now uses `assets/42u-network-rack.webp`, replacing the simplified rack SVG, while preserving all fifteen project galleries.


## Publish from GitHub (recommended)

Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choose `SpecNik/nik-vin-portfolio`.

- Production branch: `main`
- Framework preset: `None`
- Build command: leave empty
- Build output directory: `.`

The site is plain HTML/CSS/JavaScript and does not need a build step. New commits to `main` trigger automatic Cloudflare Pages deployments.

To open project photos, click the large cover image or the **Open gallery** button. No downloadable resume is published.
