# GoldRate24 - Real-time Gold Rates & Financial Calculators

A modern, SEO-optimized web application for tracking live gold rates and calculating financial metrics across India.

## Features

### 🏆 Core Features
- **Real-time Gold Rates**: Live gold prices for 24K, 22K, and 18K gold updated hourly
- **City-specific Rates**: Gold rates for 100+ cities across India with dedicated SEO pages
- **Advanced Calculators**:
  - Gold Purchase Calculator (with making charges, GST, discounts)
  - Home Loan EMI Calculator
  - Gold Loan Calculator

### 🎨 Design & UX
- Modern, premium UI with gold-themed design system
- Fully responsive across all devices
- Dark mode support
- Smooth animations and micro-interactions
- Glassmorphism effects

### ⚡ Technical Features
- Built with Next.js 14 (App Router)
- TypeScript for type safety
- Tailwind CSS with custom design tokens
- SWR for data fetching and caching
- SEO-optimized with proper meta tags
- Fast page loads and excellent Core Web Vitals

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd goldrate24
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env.local
```

4. Update `.env.local` with your API keys and configuration

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
goldrate24/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles with design system
│   ├── about/               # About page
│   ├── gold-rates/          # Gold rates page
│   ├── cities/              # Cities listing and dynamic pages
│   ├── calculators/         # Calculator pages
│   │   ├── page.tsx        # Calculators landing
│   │   ├── gold/           # Gold calculator
│   │   ├── home-loan/      # Home loan calculator
│   │   └── gold-loan/      # Gold loan calculator
│   └── api/                 # API routes
│       └── gold-rates/      # Gold rates API
├── components/              # React components
│   ├── layout/             # Layout components (Header, Footer)
│   └── home/               # Home page components
├── hooks/                   # Custom React hooks
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## API Integration

The application is ready for real API integration. Update the following:

1. Set your API URL and key in `.env.local`:
```env
NEXT_PUBLIC_GOLD_API_URL=https://your-api-url.com
NEXT_PUBLIC_GOLD_API_KEY=your_api_key
```

2. Update `/app/api/gold-rates/route.ts` to fetch from your actual API

## SEO Features

- Proper meta tags for all pages
- Dynamic metadata for city pages
- Semantic HTML structure
- Optimized for search engines
- City-specific pages for local SEO

## Design System

The application uses a comprehensive design system with:
- Semantic color tokens (HSL-based)
- Consistent spacing and typography
- Reusable component classes
- Dark mode support
- Custom animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email info@goldrate24.in or visit our website.

---

Built with ❤️ for the Indian gold market
