# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Hugo static site generator and Tailwind CSS. The site showcases projects, posts, and professional information, deployed to GitHub Pages at https://timbomckay.github.io/.

## Common Commands

### Development
- `npm run serve` - Start Hugo development server with live reload
- `npm run build` - Build the site for production (outputs to `public/` directory)

### Hugo-specific
- `hugo server` - Alternative way to start development server
- `hugo --cleanDestinationDir` - Build with clean destination directory

## Architecture & Structure

### Hugo Site Structure
- **Content**: All content lives in `content/` directory
  - `content/_index.md` - Homepage content
  - `content/posts/` - Blog posts
  - `content/projects/` - Project portfolio items
- **Layouts**: HTML templates in `layouts/` directory using Go templating
  - `layouts/_default/baseof.html` - Base template for all pages
  - `layouts/partials/` - Reusable template components
- **Static Assets**: `static/` directory for files served as-is
- **Generated Output**: `public/` directory (git-ignored, auto-generated)

### Styling System
- Uses Tailwind CSS v4+ for utility-first styling
- Tailwind configuration integrated with Hugo's build system
- Hugo stats tracking enabled for CSS purging (`hugo_stats.json`)

### Content Management
- Content written in Markdown with YAML frontmatter
- Projects are the main content section (`mainSections = ['projects']`)
- Image processing handled by Hugo with responsive image generation

### Deployment
- Automated deployment via GitHub Actions (`.github/workflows/hugo.yml`)
- Builds on push to `main` branch
- Uses Hugo Extended v0.147.1
- Deploys to GitHub Pages with proper caching

## Key Configuration Files
- `config.toml` - Hugo site configuration
- `package.json` - Node.js dependencies (Tailwind CSS)
- `hugo_stats.json` - Auto-generated file for CSS purging (don't edit manually)

## Development Notes
- The site uses Hugo's image processing for responsive images
- Tailwind CSS is integrated with Hugo's build pipeline
- GitHub Actions automatically deploys on push to main branch
- The site structure follows Hugo's standard conventions for content organization