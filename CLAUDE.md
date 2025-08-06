# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a static landing page for Keyway, a secrets management tool. The entire site is contained in a single `index.html` file with no build process or dependencies.

## Tech Stack

- **Pure HTML5, CSS3, and vanilla JavaScript** (no frameworks)
- **Static deployment** via GitHub Pages to keyway.sh domain
- **Google Fonts** loaded via CDN (Roboto and Roboto Mono)

## Development Commands

This is a static site with no build process. Common operations:

```bash
# Serve locally (choose one):
python3 -m http.server 8000
npx serve .
open index.html  # macOS: open directly in browser

# Deploy changes:
git add .
git commit -m "your message"
git push origin main
# GitHub Pages automatically deploys from main branch
```

## Architecture

The entire website is self-contained in `index.html` with:
- Embedded CSS styles in `<style>` tag
- No external JavaScript (minimal inline scripts)
- Mobile-first responsive design using CSS Grid and Flexbox
- Semantic HTML5 structure

## Key Design Patterns

1. **Single-file architecture**: Everything in index.html for simplicity and performance
2. **BEM-like CSS naming**: Components use consistent class naming (e.g., `.hero-section`, `.feature-card`)
3. **CSS custom properties**: Color scheme defined as CSS variables for consistency
4. **Progressive enhancement**: Works without JavaScript, enhanced with smooth scrolling

## Visual Identity

Primary colors:
- Gradient: `#667eea` to `#764ba2` (purple gradient used throughout)
- Dark backgrounds: `#0a0e27`, `#1a1f36`
- Text: White on dark, with `rgba(255, 255, 255, 0.9)` for body text

## Deployment

The site auto-deploys to keyway.sh via GitHub Pages when changes are pushed to the main branch. The CNAME file configures the custom domain.