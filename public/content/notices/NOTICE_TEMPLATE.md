# NASCORE STUDIO — Notice Publishing Template

To publish a notice directly on GitHub:

## Option A: Add to `public/content/notices/index.json` (Recommended for instant sync)
Copy and append the JSON object below to the `notices` array in `public/content/notices/index.json`:

```json
{
  "id": "notice-2025-04",
  "slug": "title-of-your-notice",
  "title": "Your Notice Headline Here",
  "date": "2025-03-01",
  "category": "Announcement",
  "summary": "A 1-2 sentence preview summary of this announcement.",
  "pinned": false,
  "author": {
    "name": "NASCORE STUDIO",
    "role": "Editorial"
  },
  "content": "Full Markdown content goes here. Supports **bold**, *italic*, bullet lists, and [links](https://youtube.com)."
}
```

## Available Categories:
- `Announcement`
- `Production`
- `Gaming`
- `Release`
- `Community`
- `Maintenance`

## Supported Markdown Syntax:
- `# Large Heading`
- `## Medium Heading`
- `### Section Heading`
- `**Bold text**`
- `*Italic text*`
- `* Bullet item`
- `1. Numbered item`
- `> Quote block`
- `[Link Text](https://example.com)`
- `---` (horizontal rule)
