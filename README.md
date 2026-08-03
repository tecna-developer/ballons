# Balloons

A landing page for hot-air balloon tours over the old town of Tallinn. Built as a study of
SCSS architecture and of how far a page gets on CSS alone — the navigation, the animations
and the hover compositions all work without a single line of JavaScript.

**Live demo:** https://tecna-developer.github.io/ballons/

![Balloons](og-image.png)

## Highlights

- **No JavaScript.** There is no `src/js` directory. The menu is a hidden checkbox plus its
  label: `#navi-toggle` is visually removed, `.navigation__button` is the label the user
  clicks, and `:checked` drives a radial-gradient circle that scales out from under the
  button on `cubic-bezier(0.68, -0.6, 0.32, 1.6)` before the links fade in.

- **The root font size is the responsive lever.** `html` is set to `62.5%` so `1rem` is
  10px, then stepped down per breakpoint — 56.25% on tablet-landscape, 50% on
  tablet-portrait, 30% on phones — and up to 75% above 1800px. Because every length in the
  project is in `rem`, one declaration rescales the entire layout instead of each block
  needing its own override.

- **A hand-rolled float grid.** `.row` with `.col-1-of-2`, `.col-1-of-3`, `.col-2-of-3`,
  `.col-1-of-4` and friends, each width computed as
  `calc((100% - N * #{$gutter-horizontal}) / M)` and cleared with a `clearfix` mixin. It
  predates the CSS Grid work in the other projects here and is kept as it was written.

- **Video backgrounds.** The tour section plays a muted, looping `<video>` behind the
  content with both `.mp4` and `.webm` sources, sitting at `z-index: -2` under a
  `linear-gradient` overlay at `-1` so the text keeps its contrast whatever frame is on
  screen.

- **A photo composition that reacts as a group.** The gallery images are absolutely
  positioned and overlap; hovering one lifts it with `transform: scale(1.1)` and an
  `outline` offset from the edge, while `&:hover &__img:not(:hover)` pushes the others back.

- **Entry animations** are three keyframes — `leftToRight`, `RightToLeft` and `btnToUp` —
  that overshoot slightly before settling, so the heading and the button do not simply
  appear.

- **The booking form** uses floating labels driven by `:placeholder-shown`, and radio inputs
  styled through their labels rather than with custom markup.

## Running it

```bash
npm install
npx gulp
```

The default task compiles the SCSS, copies fonts, icons and images, minifies the HTML into
`dist/` and serves that directory with browser-sync, watching `src/scss` and `src/*.html`.

Styles go through sass (`outputStyle: compressed`) → autoprefixer → clean-css and land as
`dist/css/style.min.css`; images pass through imagemin.

## Structure

The SCSS follows a 7-1-style split:

```
src/index.html
src/scss/style.scss              imports everything in order
src/scss/abstract/               _variables, _mixins (respond, clearfix, centerAbc), _functions
src/scss/base/                   _main (reset), _typography (root font sizes), _animations, _uttilites
src/scss/components/             _button, _button-text, _card, _tour-card, _feedback-card,
                                 _gallery, _video-bg, _book
src/scss/layout/                 _header, _grid, _navigation, _footer
src/scss/pages/                  _home
src/images/                      photography plus the .mp4 / .webm backgrounds
src/css/style-icons.css          icomoon icon font
dist/                            build output
```

Breakpoints live only in the `respond()` mixin: `phone` 600px, `tab-port` 900px, `tab-land`
1240px, `big-screen` a 1800px minimum. Type is Roboto from Google Fonts; the palette is two
browns, two greys and a footer colour, all in `_variables.scss`.

## Scope

The page is presentational. The booking form validates nothing and submits nowhere, and the
navigation links point at anchors on the same page. Content is in Russian.

## Deployment

Source lives on `main`. A push there runs `.github/workflows/deploy.yml`, which builds with
`npm run build` and publishes `dist/` to the `gh-pages` branch, which is what Pages serves.
`dist/` is not tracked — CI produces it.

`gh-pages` is therefore generated output. Do not edit it by hand: the next deploy replaces
it wholesale. Everything the published page needs must come out of `gulp build`, which is
why there are copy tasks for `og-image.png` and for the hand-written icomoon stylesheet and
fonts in `src/css` — neither is compiled from scss, so neither was reaching `dist/` on its
own.
