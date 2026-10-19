# NASCORE STUDIO — Official Creator Web Platform

Official production-grade web application for **NASCORE STUDIO** — Independent digital creator and entertainment media brand specializing in cinematic storytelling, tactical gaming analyses, investigative documentaries, and original audiovisual projects.

---

## ⚡ Quick Start: 3 Essential Steps

### 1. Configure Your YouTube Channel
Open `src/config/siteConfig.ts` or create a `.env` file from `.env.example`:

```bash
# In .env:
VITE_YOUTUBE_API_KEY="YOUR_YOUTUBE_DATA_API_KEY"
VITE_YOUTUBE_CHANNEL_ID="UC_x5XG1OV2P6uZZ5FSM9Ttw" # Or your handle e.g. @nascorestudio
```

* **Where to find Channel ID:** Visit [YouTube Advanced Account Settings](https://www.youtube.com/account_advanced) while logged in. Copy the **Channel ID** (starts with `UC...`).
* **Where to get a YouTube API Key (100% Free):**
  1. Open [Google Cloud Console](https://console.cloud.google.com/).
  2. Create a free project (e.g., "Nascore Website").
  3. Go to **APIs & Services > Library**, search for **YouTube Data API v3**, and click **Enable**.
  4. Go to **APIs & Services > Credentials** > **Create Credentials** > **API Key**.
  5. *(Recommended Security)* Click Edit on the API Key, choose **Set an application restriction > Websites**, and add your website URL (e.g., `https://yourusername.github.io/*`).

---

### 2. Free GitHub Notice Publishing (Zero Server / Zero CMS)

You can publish official announcements, casting calls, and production updates directly from your browser without using the terminal:

1. Go to your repository on GitHub.
2. Open `public/content/notices/index.json`.
3. Click the **Pencil icon (Edit this file)** in GitHub.
4. Add your new notice to the `notices` array:
```json
{
  "id": "notice-2025-04",
  "slug": "documentary-premiere",
  "title": "New Documentary Premiere This Friday",
  "date": "2025-03-01",
  "category": "Release",
  "summary": "Join our live YouTube premiere exploring internet media archaeology.",
  "pinned": true,
  "author": {
    "name": "NASCORE STUDIO",
    "role": "Editorial"
  },
  "content": "# Premiere Announcement\n\nFull Markdown content with **bold**, *italics*, bullet points, and [links](https://youtube.com/@nascorestudio)."
}
```
5. Click **Commit changes**.
6. That's it! Because the website fetches notices directly from your GitHub repository (or via GitHub Pages), the new notice goes live automatically.

---

### 3. Deploy Free to GitHub Pages in 2 Minutes

The project includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

1. Push this repository to GitHub.
2. In your GitHub repository, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. In **Settings > Secrets and variables > Actions**, add your secret:
   - `VITE_YOUTUBE_API_KEY`: Your restricted YouTube Data API Key
   - Under **Variables**, add:
     - `VITE_YOUTUBE_CHANNEL_ID`: Your channel ID (starts with `UC...`)
5. On every push to `main` (or when you edit a notice), GitHub will automatically build and deploy your website to `https://<username>.github.io/<repo>/`!

---

## 🛠️ Technology Stack & Architecture

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom dark cinematic theme
- **Video Integration**: YouTube Data API v3 (`playlistItems.list` uploads pipeline costing only 1 quota unit instead of 100 for search)
- **Shorts Engine**: Intelligent duration and tag analysis
- **Notice System**: Serverless JSON / Markdown manifest with priority GitHub Raw fetching
- **Markdown**: Pure React AST renderer (zero XSS vulnerability, sanitized links)
- **SEO & Social**: OpenGraph cards, Twitter cards, Schema.org `Organization` structured data, `robots.txt`, and `sitemap.xml`
- **Hosting**: 100% Free Static Hosting (GitHub Pages, Vercel, Cloudflare Pages, Netlify)

---

## 📁 Key File Map

| Path | Purpose |
| --- | --- |
| `src/config/siteConfig.ts` | **Central site settings**: brand name, tagline, YouTube channel ID, socials |
| `src/services/youtube.ts` | YouTube Data API v3 integration with quota-safe caching |
| `src/services/notices.ts` | GitHub-powered notices fetcher with fallback resilience |
| `public/content/notices/index.json` | Public notices manifest for browser and GitHub editing |
| `public/content/notices/NOTICE_TEMPLATE.md` | Copy-paste template for new announcements |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for zero-cost GitHub Pages deployment |
| `.env.example` | Template for environment variables |
| `public/robots.txt` & `sitemap.xml` | Search engine crawlers and indexing |

---

## 🔒 Security & Privacy Notice

- **No Secrets in Client Code**: The YouTube API key is intended for public browser consumption with HTTP referer restrictions in Google Cloud Console.
- **No Token Exposure**: The notice publishing workflow requires no GitHub Personal Access Tokens or server secrets in browser storage.
