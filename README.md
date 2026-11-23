# Portfolio

Static site: `index.html`, `style.css`, `script.js`, `data.js`. No build step.

## Edit content
All text (about, skills, projects, experience, links) lives in **`data.js`**.

## Update your resume
Replace `assets/resume.pdf` with your new PDF (same filename), then commit and push.

## Project carousel images
Save screenshots in `assets/img/` and list their paths in each project's `images` array in `data.js`.
Until an image exists, its slide shows a text placeholder.

## Contact form
1. Sign up at https://formspree.io, create a form, copy its endpoint (`https://formspree.io/f/xxxx`).
2. Paste it into `formspree` in `data.js`.
Until then, the form opens the visitor's email app (mailto).

## Deploy (GitHub Pages)
Push this folder to a GitHub repo, then Settings → Pages → Deploy from branch `main` / root.
