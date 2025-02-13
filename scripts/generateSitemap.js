require('dotenv').config({ path: './.env.local' });
const fs = require('fs');
const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://defaultdomain.com';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- додати інші URL тут за потребою -->
</urlset>
`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log('Sitemap згенеровано.');
