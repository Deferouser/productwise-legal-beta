# Product Wise Beta Tester Agreement Portal

A premium, interactive single-page agreement viewer for Defero Limited's pre-release beta program for the **Product Wise** application. 

This portal has been built from scratch using **Bootstrap 5** and custom CSS variables, optimized for instant, clean deployment on **GitHub Pages**.

---

## 🌟 Key Features

1. **Scrollspy Navigation & Reading Progress**:
   - Outlines the complete 9 sections of the agreement.
   - Built-in Scrollspy navigation sidebar lets the tester jump to sections (Obligations, Confidentiality, Governing Law, etc.) easily.
   - Live reading percentage progress bar at the top of the agreement.

2. **Sleek Light/Dark Mode Toggle**:
   - Fully customizable color styling built on custom HSL CSS variables, offering smooth theme transitions.

3. **Responsive Glassmorphism Styling**:
   - Modern borders, glows, and custom typography (*Plus Jakarta Sans*).
   - Fully responsive layout for desktop, tablet, and mobile browsers.

---

## 🚀 How to Deploy on GitHub Pages

This project is a static site (using relative asset paths) designed specifically to run perfectly on GitHub Pages from the root folder without compiling. Follow these steps:

1. **Push Code to GitHub**:
   - Open your terminal in this repository.
   - Stage, commit, and push your branch:
     ```bash
     git add .
     git commit -m "Configure simplified Beta Tester Agreement"
     git branch -M main
     git push -u origin main
     ```

2. **Enable GitHub Pages**:
   - Go to your repository page on [GitHub](https://github.com).
   - Click the **Settings** tab (near the top menu bar).
   - In the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under the **Build and deployment** settings:
     - Set **Source** to `Deploy from a branch`.
     - Under **Branch**, select `main` (or your default branch) and set the folder to `/ (root)`.
     - Click **Save**.

3. **Visit Your Portal**:
   - Within 1–2 minutes, GitHub will build the site. A URL will be displayed in the **Pages** settings panel, typically formatted as:
     `https://<github-username>.github.io/<repository-name>/`

---

## 🛠️ Technology Stack

- **Framework**: Bootstrap 5 (CSS & JS Components via fast CDN)
- **Icons**: Bootstrap Icons CDN
- **Fonts**: Google Fonts (*Plus Jakarta Sans*)
- **Scripting & Styling**: Vanilla HTML5, CSS3, and ES6 Javascript
