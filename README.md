# builder-demo

A single-page marketing website for **Task Constructions**, a builder selling premium
attic flats in Aman Vihar, Tutikandi, Shimla. It is a demo build rather than the
client's live site: the phone and WhatsApp links are still placeholders
(`+91XXXXXXXXXX`), the gallery uses CSS placeholder tiles instead of photos, and the
enquiry form has no backend — it validates input in the browser and then shows a
success toast after a short simulated delay.

The page is one hand-written `index.html` with eight sections: hero, about, location,
attics, features, gallery, testimonials and contact. The four unit cards are Alpine
Studio, Cedar 1BHK, Pine 2BHK and Summit Penthouse (3BHK duplex). A live copy is
deployed at https://builder-demo-psi.vercel.app.

## Stack

- Static HTML, CSS and vanilla JavaScript — no framework, no build step
- CSS custom properties for the palette and type scale; Playfair Display + DM Sans
  from Google Fonts
- `script.js` (plain JS, no dependencies): sticky nav, hamburger menu, smooth anchor
  scrolling, `IntersectionObserver` reveal animations, animated stat counters, page
  loader, back-to-top button, toast notifications, enquiry-form validation
- Express 4 (`server.js`) to serve `public/` locally on port 3000
- Vercel for hosting — `vercel.json` rewrites every path into
  `task-constructions/public/`, so the deployed site is served as static files and
  `server.js` is only used for local preview

## Running it

```bash
cd task-constructions
npm install
npm start        # or: npm run dev — both run `node server.js`
```

Then open http://localhost:3000. Opening `task-constructions/public/index.html`
directly in a browser also works, since nothing is server-rendered.

## Structure

```
vercel.json                      rewrites all routes to the public folder
task-constructions/
  server.js                      Express static server (port 3000)
  package.json
  public/
    index.html                   the whole page
    styles.css
    script.js
    images/hero-bg.jpg           the only image in the repo
.playwright-mcp/                 captured console log + page snapshot from a browser check
```
