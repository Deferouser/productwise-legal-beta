# Product Wise Beta Tester Agreement Portal

An interactive, premium single-page agreement portal for Defero Limited's pre-release beta program for the **Product Wise** application. 

This portal has been built from scratch using **Bootstrap 5**, custom CSS variables, and modern canvas drawing scripts, optimized for instant, clean deployment on **GitHub Pages**.

---

## 🌟 Key Features

1. **Document Scroll-Spy & Reading Progress**:
   - The user must scroll through and read at least 90% of the agreement before the consent checkbox and submission forms are activated.
   - Built-in Scrollspy navigation sidebar lets the tester jump to sections (Introduction, Confidentiality, Governing Law, etc.) easily.
   
2. **Flexible Signature Input**:
   - **Draw Signature**: Interactive canvas signature sketching pad for drawing with mouse, trackpad, or touch devices.
   - **Type Signature**: A handwriting input field styling the tester's signature dynamically in elegant script fonts.

3. **Live Certificate Preview**:
   - A sticky, modern compliance certificate card that updates in real-time as the tester types their name, email, selects their signature type, and logs the current signing timestamp.
   - Generates a simulated secure cryptographic fingerprint signature identifier.

4. **Contributor Tier & Rewards Simulator**:
   - Section 3 of the agreement specifies that testers who submit at least 10 verified price reports achieve "Contributor Status" and earn "GiftMe" points.
   - A live range slider allows testers to simulate reports and witness their status upgrade from "Beta Tester" to "Contributor", animating the points wallet updates and GiftMe rewards eligibility.

5. **Sleek Light/Dark Mode Toggle**:
   - Fully customizable color styling built on custom HSL CSS variables, offering smooth theme transitions.

---

## 🚀 How to Deploy on GitHub Pages

This project is a static site (using relative asset paths) designed specifically to run perfectly on GitHub Pages from the root folder without compiling. Follow these steps:

1. **Push Code to GitHub**:
   - Open your terminal in this repository.
   - Stage, commit, and push your branch:
     ```bash
     git add .
     git commit -m "Initialize Beta Tester Agreement Portal"
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
   - You can copy this URL and share it with your beta testers to sign!

---

## 🛠️ Technology Stack

- **Framework**: Bootstrap 5 (CSS & JS Components via fast CDN)
- **Icons**: Bootstrap Icons CDN
- **Fonts**: Google Fonts (*Plus Jakarta Sans* for headings/body, *Caveat*, *Alex Brush*, and *Great Vibes* for script signatures)
- **Scripting & Styling**: Vanilla HTML5, CSS3, and ES6 Javascript (No compilation required, ensuring 100% Page speed score on static CDNs)
