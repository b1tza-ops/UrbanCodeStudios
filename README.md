# UrbanCode Studio - Marketing Website

A production-ready marketing website for UrbanCode Studio, a web design agency targeting London trades and local businesses.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16, TypeScript, and TailwindCSS
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **SEO Optimized**: Proper meta tags, semantic HTML, and search-friendly structure
- **Accessible**: ARIA labels and semantic HTML for better accessibility
- **Interactive**: Smooth scrolling, active navigation highlighting, and form validation
- **Performance Optimized**: Fast loading with Next.js optimization
- **Docker Ready**: Containerized for easy deployment

## 🎨 Design

### Brand Colors
- **Primary**: `#1F2A44` (Deep Slate Blue)
- **Accent**: `#3B82F6` (Electric Blue)
- **Light Grey**: `#F3F4F6`
- **White**: `#FFFFFF`

### Key Sections
1. **Sticky Header** - Navigation with smooth scroll and active section highlighting
2. **Hero Section** - Main headline with CTA buttons and device mockup
3. **Problem Section** - 4 pain points addressed by the service
4. **Services Section** - Website Design, Local SEO, and Google Business Optimization
5. **Pricing Section** - 3 transparent pricing tiers (Basic £299, Standard £499, Pro £799)
6. **Before & After** - Visual comparison of old vs new websites
7. **Testimonials** - Client reviews with 5-star ratings
8. **Final CTA** - Conversion-focused call-to-action
9. **Contact Form** - Lead capture with validation and success message
10. **Footer** - Quick links, legal, and location information

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server will start at `http://localhost:3000`.

## 🐳 Docker Deployment

### Quick Start with Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Build Docker Image Manually

```bash
# Build the image
docker build -t urbancodestudio .

# Run the container
docker run -p 3000:3000 urbancodestudio
```

## ☁️ VPS Deployment

For detailed instructions on deploying to any VPS (DigitalOcean, Linode, Vultr, Google Cloud, etc.), see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

### Quick Deployment Steps:

1. **Get a VPS** (Ubuntu 22.04, 2GB RAM recommended)
2. **SSH into your VPS**
3. **Clone and setup**:
   ```bash
   cd /opt
   sudo git clone https://github.com/b1tza-ops/UrbanCodeStudios.git urbancodestudio
   cd urbancodestudio
   sudo chmod +x setup-vm.sh deploy.sh
   sudo ./setup-vm.sh
   ```
4. **Configure and deploy**:
   ```bash
   cp .env.example .env
   ./deploy.sh
   ```
5. **Configure Nginx** (see DEPLOYMENT.md for details)
6. **Setup Cloudflare** (optional but recommended - see CLOUDFLARE.md)

## 📱 Project Structure

```
├── app/
│   ├── about/           # About page
│   ├── faqs/            # FAQs with accordion
│   ├── privacy/         # Privacy policy
│   ├── terms/           # Terms of service
│   ├── globals.css      # Global styles and Tailwind directives
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main landing page component
├── components/
│   ├── Accordion.tsx    # Reusable accordion component
│   └── PageLayout.tsx   # Shared layout for all pages
├── public/              # Static assets
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── nginx.conf           # Nginx reverse proxy config
├── setup-vm.sh          # VM initialization script
├── deploy.sh            # Deployment script
└── DEPLOYMENT.md        # Detailed deployment guide
```

## ✨ Key Features Implementation

### Mobile Hamburger Menu
- Responsive menu for mobile/tablet screens (< 1024px)
- Smooth slide-in animation from right
- Backdrop overlay with click-to-close
- ESC key support and body scroll lock

### Additional Pages
- **Privacy Policy**: GDPR-compliant privacy policy for UK business
- **Terms of Service**: Complete terms and conditions
- **FAQs**: Interactive accordion with 12 comprehensive questions
- **About**: Company story, mission, values, and process

### Smooth Scrolling
Navigation buttons smoothly scroll to sections using `element.scrollIntoView({ behavior: "smooth" })`.

### Active Section Highlighting
Uses `IntersectionObserver` API to detect which section is currently in view and highlights the corresponding navigation link.

### Contact Form
- Client-side validation with required fields
- Success message display after submission
- Form reset after successful submission
- No backend integration (uses `preventDefault`)

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly navigation
- Optimized typography and spacing for all screen sizes

## 🎯 Target Audience

- London trades (plumbers, electricians, cleaners, builders)
- Small to medium local businesses
- Companies seeking more local enquiries

## 🔒 Security & Performance

- HTTPS support via Let's Encrypt (in production)
- Docker containerization for consistent environments
- Nginx reverse proxy for static file serving
- Next.js optimization and code splitting
- Standalone output for minimal image size

## 📊 Monitoring

```bash
# View application logs
docker-compose logs -f

# Check container stats
docker stats

# Monitor Nginx logs
sudo tail -f /var/log/nginx/access.log
```

## 🔄 Updates & Maintenance

```bash
# Pull latest changes
git pull origin main

# Redeploy
./deploy.sh

# Restart without rebuilding
docker-compose restart
```

## 📝 License

All rights reserved © 2026 UrbanCode Studio

## 🤝 Contributing

This is a client project. For issues or feature requests, please contact the development team.
