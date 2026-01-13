# MyInteractiveCV

Simple static personal website for Boško Cvetković. No build step — plain HTML, CSS and vanilla JavaScript.

Quick overview
- Purpose: A single-page portfolio/CV site with small interactive UI (modals, animated counters, staggered reveals).
- Tech: HTML, CSS, JavaScript, static assets (images).

Repository layout
- `index.html` — main single-page content with section ids (`#hero`, `#about`, `#focus`, `#philosophy`, `#experience`, `#skills`, `#contact`).
- `css/style.css` — site styling. Uses CSS variables in `:root` for colors and transitions.
- `js/script.js` — all client-side behavior: smooth scrolling, IntersectionObserver-based staggered animations (`.fade-in` + `data-stagger-group`), modal handling wired by `data-modal` and `modalContent`, animated stat counters, and small UI interactions.
- `assets/images/` — images used by the site (e.g. `ProfileImage.jpg`).
- `.github/copilot-instructions.md` — guidance for AI coding agents (project conventions and examples).

Local preview
1. Open `index.html` in a browser (double-click or use your editor's Live Preview).
2. For a simple HTTP server (helps with some browser behaviors), run (PowerShell):

```powershell
# from the repo root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Editing guidance
- Keep behavior changes inside `js/script.js`. The file centralizes scroll offsets, animation groups, and modal mapping.
- When adding animated elements, add `class="fade-in"` and the same `data-stagger-group` value so the IntersectionObserver staggers them together.
- To add a modal: add the interactive card with `data-modal="key"` in `index.html` and add a `modalContent.key` entry in `js/script.js` with `title` and `body` (HTML string).
- Stick to CSS variables in `css/style.css` for colors and transitions; avoid adding global selectors.

Does this project need a .gitignore?
Yes. While the repo is static and doesn't generate many build artifacts, a `.gitignore` is still useful to avoid committing OS/editor metadata and node artifacts if you ever add tooling.

Common ignores added to this repository: `.DS_Store`, `Thumbs.db`, `.env`, editor folders like `.vscode/`, and `node_modules/`.

Contact & contributions
If you'd like extra sections (contributing, testing checklist, deployment instructions), tell me what to include and I can expand this README.
