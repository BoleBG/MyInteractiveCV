<!--
Guidance for automated coding agents working on the "MyInteractiveCV" repository.
Keep this file concise and focused on patterns discoverable in the codebase.
-->


# Copilot / AI agent instructions for MyInteractiveCV

This repository is a small, static personal website for "Boško Cvetković". It uses plain HTML, CSS and vanilla JavaScript. The guidance below focuses on the minimal architecture, developer workflows, and conventions agents should follow when making edits or implementing features.

- Key files
- <code>index.html</code> — single-page content and landmarks (sections have ids like <code>&#35;hero</code>, <code>&#35;about</code>, <code>&#35;focus</code>, etc.). Use these ids as stable anchors when modifying layout or wiring scripts.
- <code>css/style.css</code> — single stylesheet. CSS variables (in <code>:root</code>) define colors and transitions. Prefer reusing existing variables (for example <code>--primary-color</code>) rather than hardcoding colors.
- <code>js/script.js</code> — all client-side behavior: navigation scrolling, intersection observers, modal handling, counters, and small UI interactions. Keep logic here; avoid adding new inline scripts to <code>index.html</code>.
- <code>assets/images/</code> — images used by the site (for example <code>ProfileImage.jpg</code>). Put new images here and reference using relative paths.

Big-picture architecture
- Static, client-side single page. No build tool or backend. Changes are file-based and should preserve the single-page flow.
- UI logic is centralized in <code>js/script.js</code>. Animation and progressive reveal patterns rely on <code>data-stagger-group</code> attributes and the global IntersectionObserver (see <code>script.js</code> for implementation). When adding new animated elements, add <code>class="fade-in"</code> and <code>data-stagger-group="&lt;group-name&gt;"</code> to participate in existing stagger logic.
- Modals are driven by the <code>modalContent</code> object in <code>js/script.js</code> and mapped by <code>data-modal</code> attributes on interactive cards (for example <code>.focus-card</code>, <code>.stat-card</code>). To add another modal entry, extend <code>modalContent</code> with a new key and the HTML body string.

Conventions & patterns
- DOM-driven behaviour: prefer adding or updating entries in <code>js/script.js</code> rather than attaching new inline handlers in HTML.
- Accessibility: navigation anchors use <code>href="&#35;&lt;id&gt;"</code>. Keep the header offset logic in <code>script.js</code> when changing sections. Preserve <code>loading="lazy"</code> on large images.
- Styling: follow existing CSS variables and utility classes. Avoid adding new global selectors that may unintentionally affect existing components.
- IDs are unique: <code>backToTop</code>, <code>modalOverlay</code>, <code>closeModal</code>, etc. Reuse these ids rather than duplicating elements.

Developer workflows (no build step)
- Local preview: open <code>index.html</code> in a browser. Because there is no build step, changes are visible immediately.
- When making edits that touch JS or CSS, test in Chrome/Edge and ensure:
  - Smooth scrolling works and header offset doesn't hide section headings.
  - IntersectionObserver stagger groups still reveal elements as before.
  - Modal open/close prevents body scroll and the page layout doesn't shift (the script calculates scrollbar width).

Examples (concrete edits)
- Add a new focus card that opens a modal:
  - Add HTML inside the <code>&#35;focus</code> section similar to other <code>.focus-card</code> entries.
  - Give it <code>data-modal="newKey"</code>.
  - In <code>js/script.js</code>, add <code>modalContent.newKey = { title: '...', body: '<p>...</p>' }</code>.

- Add a new animated section:
  - In <code>index.html</code>, add elements with <code>class="fade-in stagger-item" data-stagger-group="stats"</code>.
  - No JS changes are required if the new group name is reused across elements. If the group is unique, ensure elements share the same <code>data-stagger-group</code> value to get staggered entrance.

What to avoid
- Don't introduce frameworks, bundlers, or heavy dependencies — this repo is intentionally minimal and static.
- Avoid inline style attributes for persistent styling; prefer updating <code>css/style.css</code> and using existing CSS variables.
- Don't change element ids used by <code>js/script.js</code> unless you update the script accordingly.

Edit policy for AI agents
- Small, focused changes (fix a bug, add a card, tweak styling) are fine. For larger refactors (split JS into modules, add a build step), open a draft PR and describe the motivation — these changes may be out of scope for this small static site.

If you are unsure
- Search <code>index.html</code> and <code>js/script.js</code> for the pattern you want to change. Use the existing modal, animation, and navigation code as templates.
- Ask the repository owner whether they want to keep the site static or accept a migration to a build setup.

End of instructions.
