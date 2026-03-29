# Aditya Prakash Purohit Portfolio

A responsive personal portfolio website for Aditya Prakash Purohit (AIML Engineer). The single-page web app showcases hero intro, about, skills, projects (GitHub-powered), education, and contact details.

## 🚀 Features

- Animated gradient background and particle effects
- Mobile-first navigation and sections
- Typed headline effect in hero section
- Profile image in about section (`Profile.png` as favicon)
- Skills progress bar animation
- Projects section fetches GitHub repos dynamically (from `ap6107308` user)
- Contact links including GitHub, LinkedIn, and email

## 📁 Files

- `index.html` — main page markup
- `styles.css` — styling for all sections and responsive UI
- `script.js` — dynamic behavior, project fetching, typewriter, and mobile menu
- `Profile.png` — profile image and favicon

## 🛠️ Setup

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

No server setup is required; the site runs as static HTML/CSS/JS.

## 🌐 GitHub Projects Data

The site calls GitHub REST API (`https://api.github.com/ap6107308/`) to list repository cards in the Projects section.

> Note: GitHub's unauthenticated rate limit is 60 requests per hour. For heavy use, add a personal access token and update the fetch call in `script.js`.

## 💡 Customize

- Update hero and about content in `index.html`
- Adjust theme colors and responsive breakpoints in `styles.css`
- Modify project filtering or card design in `script.js`

## 📝 License

Open for personal use and customization. Give credit if you copy the structure or visuals.
