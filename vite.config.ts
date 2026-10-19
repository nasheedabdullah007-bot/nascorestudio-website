import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import https from 'https';
import { defineConfig, Plugin } from 'vite';

const youtubeFeedPlugin = (): Plugin => ({
  name: 'youtube-rss-proxy',
  configureServer(server) {
    server.middlewares.use('/api/youtube-feed', (req, res) => {
      const parsedUrl = new URL(req.url || '', 'http://localhost');
      const channelId = parsedUrl.searchParams.get('channelId') || 'UCDXae4TDvxSCX7w5u2a5FsQ';

      https
        .get(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, (ytRes) => {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          ytRes.pipe(res);
        })
        .on('error', (err) => {
          res.statusCode = 500;
          res.end(err.message);
        });
    });
  },
});

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), youtubeFeedPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
