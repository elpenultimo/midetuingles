import { MetadataRoute } from 'next';

const baseUrl = 'https://www.midetuingles.com';

const routes = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/test/a1', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/test/a2', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/test/b1', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/test/b2', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/test/c1', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/test/c2', changeFrequency: 'monthly' as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
