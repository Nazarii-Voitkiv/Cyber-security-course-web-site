require('dotenv').config({ path: './.env.local' });
const fs = require('fs');
const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://defaultdomain.com';

const robots = `User-agent: *
Allow: /
Sitemap: ${domain}/sitemap.xml
`;

fs.writeFileSync('./public/robots.txt', robots);
console.log('robots.txt згенеровано.');
