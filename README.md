<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1YJeNVct3qlZCyr2XgPms8bsyeNnFnF7A

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

   ---

   ## Local prototype (no install required)

   This workspace also contains a small static prototype of the Royal College site you asked for.

   - `royal-college.html` — Home page prototype (header, campuses, announcement)
   - `portal.html` — Portal placeholder (login form; client-side only — submits show Error 503)
   - `assets/css/styles.css` — Shared stylesheet with the requested color palette
   - `assets/img/logo.svg` — Local placeholder logo

   Open without installing anything:

   Double-click `royal-college.html` in File Explorer or drag it into any browser window.

   Or run this PowerShell command (from any location):

   ```powershell
   Start-Process "file:///C:/Users/CSC-STUDENT/Downloads/copy-of-fertile-map/royal-college.html"
   ```

   If you have the real logo file, upload it into `assets/img/` and I will replace the SVG with it.
