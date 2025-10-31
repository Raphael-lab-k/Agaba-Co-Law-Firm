# Anderson & Co. — Law Firm Website (Static)

This is a small, responsive static website template for a law firm. It's intentionally lightweight so you can drop it into a static host or extend it with a backend.

Files created:
- `index.html` — main page
- `css/styles.css` — styles
- `js/main.js` — simple client-side form handling

How to run locally

1. Open the `index.html` file in your browser directly (double-click or drag into browser).

2. Or run a simple HTTP server (recommended) so forms and relative paths behave correctly:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes & next steps

- The contact form currently only performs client-side validation and simulates submission. Connect it to your backend (e.g., Formspree, Netlify Forms, or your API) to receive messages.
- Consider adding SEO meta tags, privacy policy, terms, and attorney bios with credentials.
- For production, add real images, a favicon, and tweak colors/branding.
