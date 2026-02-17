# UrbanCode Studio - Marketing Website

A production-ready marketing website for UrbanCode Studio, a web design agency targeting London trades and local businesses.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16, TypeScript, and TailwindCSS
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **SEO Optimized**: Proper meta tags, semantic HTML, and search-friendly structure
- **Accessible**: ARIA labels and semantic HTML for better accessibility
- **Interactive**: Smooth scrolling, active navigation highlighting, and form validation
- **Performance Optimized**: Fast loading with Next.js optimization

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

## 🛠️ Installation

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

## 📱 Development

The development server will start at `http://localhost:3000`.

### Project Structure
```
├── app/
│   ├── globals.css      # Global styles and Tailwind directives
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main landing page component
├── tailwind.config.ts   # Tailwind configuration with brand colors
├── tsconfig.json        # TypeScript configuration
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies and scripts
```

## ✨ Key Features Implementation

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
- Collapsible mobile navigation
- Optimized typography and spacing for all screen sizes

## 🎯 Target Audience

- London trades (plumbers, electricians, cleaners, builders)
- Small to medium local businesses
- Companies seeking more local enquiries

## 📝 License

All rights reserved © 2026 UrbanCode Studio

## 🤝 Contributing

This is a client project. For issues or feature requests, please contact the development team.
