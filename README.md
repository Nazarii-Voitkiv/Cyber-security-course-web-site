# Cyber Security Course Website

Modern landing page for a cybersecurity course, built with Next.js and cutting-edge web technologies.

## Features

- Modern cyber-themed design
- Secure admin panel
- Responsive design
- Facebook Pixel integration
- Countdown timer
- Framer Motion animations

## Technologies

- **Frontend:**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **Security:**
  - NextAuth.js
  - HTTP Security Headers
  - Rate Limiting
  - CSRF Protection
  - XSS Protection
  - Secure Password Hashing

## Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cyber-security-course-web-site.git
   cd cyber-security-course-web-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with the following variables:
   ```env
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXT_PUBLIC_FB_PIXEL_ID=your_fb_pixel_id
   NODE_ENV=production
   ```

## Development

Run in development mode:
```bash
npm run dev
```

## Build

Create production build:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Security

The project includes the following security measures:

- **Authentication:**
  - Brute force protection
  - Password hashing
  - Limited session duration

- **Attack Prevention:**
  - Rate limiting
  - CSRF protection
  - XSS protection via CSP
  - Secure Headers

- **Data Validation:**
  - Zod schemas
  - Input sanitization
  - TypeScript typing

## Project Structure

```
src/
├── app/                # Next.js app router
├── components/        # React components
├── lib/              # Utilities and helpers
├── styles/          # Global styles
└── types/           # TypeScript types
```

## Admin Panel

Access the admin panel:
1. Navigate to `/admin/login`
2. Enter admin credentials
3. Manage website content

## Analytics

The project is integrated with Facebook Pixel for conversion tracking and analytics.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.
- Unauthorized copying of any files from this project, via any medium, is strictly prohibited
- The content and code are confidential and can only be used with explicit permission from the project owner
- Written by [Your Company Name] for [Client Name], 2025

## Contact

Your Name - [@your-twitter](https://twitter.com/your-twitter) - email@example.com

Project Link: [https://github.com/your-username/cyber-security-course-web-site](https://github.com/your-username/cyber-security-course-web-site)
