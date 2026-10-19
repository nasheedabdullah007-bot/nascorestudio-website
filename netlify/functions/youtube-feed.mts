// Production counterpart of the dev-only youtube-rss-proxy middleware in vite.config.ts.
// YouTube's RSS feed has no CORS headers, so the browser fetches it through this function.
const DEFAULT_CHANNEL_ID = 'UCDXae4TDvxSCX7w5u2a5FsQ';

export default async (req: Request) => {
  const requested = new URL(req.url).searchParams.get('channelId') || DEFAULT_CHANNEL_ID;
  const channelId = /^UC[\w-]{22}$/.test(requested) ? requested : DEFAULT_CHANNEL_ID;

  try {
    const ytRes = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    if (!ytRes.ok) {
      return new Response(`YouTube feed request failed (${ytRes.status})`, { status: 502 });
    }
    return new Response(await ytRes.text(), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=900',
      },
    });
  } catch (err) {
    return new Response(err instanceof Error ? err.message : 'Feed error', { status: 500 });
  }
};

export const config = { path: '/api/youtube-feed' };
