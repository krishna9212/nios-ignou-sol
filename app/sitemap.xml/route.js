// app/sitemap.xml/route.js

import { SitemapStream, streamToPromise } from 'sitemap';
import { LRUCache } from 'lru-cache';
import { getPageUrls } from '@/app/lib/getPageUrls'; // Must return [{ url: '/path', lastmod: '2024-01-01' }, ...]

const sitemapCache = new LRUCache({
  max: 1,
  ttl: 1000 * 60 * 60, // 1 hour
});

export async function GET() {
  try {
    const cachedSitemap = sitemapCache.get('sitemap');
    if (cachedSitemap) {
      return new Response(cachedSitemap, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    }

    const hostname = 'https://nios-ignou-sol.com';
    const links = await generateSitemap();

    const sitemap = new SitemapStream({ hostname });

    links.forEach((link) => sitemap.write(link));
    sitemap.end();

    const xml = await streamToPromise(sitemap).then((data) => data.toString());

    sitemapCache.set('sitemap', xml);

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response('<error>Failed to generate sitemap</error>', {
      status: 500,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}

async function generateSitemap() {
  const urls = await getPageUrls(); 

  const baseLinks = [
    { url: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date() },
    { url: '/nios', changefreq: 'daily', priority: 0.9, lastmod: new Date() },
    { url: '/nios/nios-10th', changefreq: 'daily', priority: 0.9, lastmod: new Date() },
    { url: '/nios/nios-12th', changefreq: 'daily', priority: 0.9, lastmod: new Date() },
    { url: '/ignou', changefreq: 'daily', priority: 0.9, lastmod: new Date() },
    { url: '/sol-du', changefreq: 'daily', priority: 0.8, lastmod: new Date() },
    { url: '/about-us', changefreq: 'weekly', priority: 0.8, lastmod: new Date() },
    { url: '/contact-us', changefreq: 'monthly', priority: 0.6, lastmod: new Date() },
    { url: '/cart', changefreq: 'monthly', priority: 0.5, lastmod: new Date() },
    { url: '/search', changefreq: 'monthly', priority: 0.5, lastmod: new Date() },
  ];

  const dynamicLinks = urls.map(({ url, lastmod }) => ({
    url,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: lastmod ? new Date(lastmod) : new Date(),
  }));

  return [...baseLinks, ...dynamicLinks];
}
