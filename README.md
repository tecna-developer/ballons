# Tallinn guide Victoria

A one-page site for Victoria, a guide in Tallinn
([@tallinngid_victoria](https://www.instagram.com/tallinngid_victoria)), in Russian
(`/`) and English (`/en/`). Reworked from a balloon-tour landing page, so the SCSS
architecture and the CSS-only navigation and hover effects are carried over.

> **Status: scaffold.** Every text in `[square brackets]` is a placeholder and the photos
> are gradients. WhatsApp and Telegram buttons point at `#`. See the TODO comments in
> `src/index.html`, `src/en/index.html` and the SCSS (`_header`, `_tour-card`, `_gallery`).

## Notes

- The menu is a hidden checkbox plus its label, driven by `:checked`. The only JavaScript
  is `src/js/main.js`, which closes the overlay after a menu link is followed.
- `html` is `62.5%` and every length is in `rem`, so one font-size per breakpoint rescales
  the layout.
- A hand-rolled float grid (`.row`, `.col-1-of-N`), tour cards that flip on hover, and an
  overlapping photo gallery.
- The two pages share the same markup: change a section in both `src/index.html` and
  `src/en/index.html`.

## Running it

```bash
npm install
npm run dev      # dev server with live reload
npm run build    # production build into dist/
npm run preview  # serve dist/ locally
```

Vite builds from `src/` (`vite.config.mjs`): both HTML pages are entry points, SCSS is
compiled by Vite itself, and URLs are relative (`base: './'`) because the site is served
from the `/ballons/` subpath on GitHub Pages. Files in `public/` (icons, manifest) are
copied as they are.

## Structure

The SCSS follows a 7-1-style split:

```
src/index.html, src/en/index.html   Russian and English pages
src/js/main.js                   closes the menu on link click
public/icon/                     favicons, logo, web manifest
vite.config.mjs                  Vite config (two pages, relative base)
src/scss/style.scss              imports everything in order
src/scss/abstract/               _variables, _mixins (respond, clearfix, centerAbc), _functions
src/scss/base/                   _main (reset), _typography (root font sizes), _animations, _uttilites
src/scss/components/             _button, _button-text, _card, _tour-card, _feedback-card,
                                 _gallery, _book (contact buttons)
src/scss/layout/                 _header, _grid, _navigation, _footer
src/scss/pages/                  _home
src/images/                      put photos here (empty for now)
src/css/style-icons.css          icomoon icon font (inlined by Vite)
dist/                            build output
```

Breakpoints live only in the `respond()` mixin: `phone` 600px, `tab-port` 900px, `tab-land`
1240px, `big-screen` a 1800px minimum. Type is Roboto from Google Fonts; the palette is two
browns, two greys and a footer colour, all in `_variables.scss`.

## Scope

The site is presentational: booking happens through Instagram, WhatsApp or Telegram.

## Deployment

Source lives on `main`. A push there runs `.github/workflows/deploy.yml`, which builds with
`npm run build` (Vite) and publishes `dist/` to the `gh-pages` branch, which is what Pages serves.
`dist/` is not tracked — CI produces it.

`gh-pages` is therefore generated output. Do not edit it by hand: the next deploy replaces
it wholesale.
