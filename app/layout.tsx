import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Gold Rate Today - Live 24K, 22K, 18K Gold Price India | Gold Calculator',
        template: '%s | GoldRate24 - Live Gold Rates India'
    },
    description: 'Check today\'s live gold rate in India for 24K, 22K, and 18K gold. Get real-time gold prices in Mumbai, Delhi, Bangalore, Chennai & 100+ cities. Free gold calculator with making charges & GST. Updated hourly.',
    keywords: [
        'gold rate today',
        'gold price today',
        'gold rate',
        'gold price',
        '24k gold rate',
        '22k gold rate',
        '18k gold rate',
        'gold rate in india',
        'gold price in india',
        'gold calculator',
        'gold rate calculator',
        'gold price calculator',
        'gold rate mumbai',
        'gold rate delhi',
        'gold rate bangalore',
        'gold rate chennai',
        'today gold rate',
        'gold rate per gram',
        'gold loan calculator',
        'home loan calculator',
        'emi calculator',
        'live gold rate',
        'gold rate today per gram',
        '22k gold rate today',
        '24k gold rate today',
        'gold making charges calculator'
    ],
    authors: [{ name: 'GoldRate24' }],
    creator: 'GoldRate24',
    publisher: 'GoldRate24',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldrate24.in'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: '/',
        siteName: 'GoldRate24',
        title: 'Gold Rate Today - Live Gold Price India | 24K, 22K, 18K Gold Rates',
        description: 'Get real-time gold rates across India. Check today\'s 24K, 22K, 18K gold prices in 100+ cities. Free gold calculator with making charges. Updated every hour.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'GoldRate24 - Live Gold Rates India',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gold Rate Today - Live Gold Price India | GoldRate24',
        description: 'Check today\'s live gold rates for 24K, 22K, 18K gold across 100+ Indian cities. Free gold calculator with making charges & GST.',
        images: ['/og-image.png'],
        creator: '@goldrate24',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    // verification: {
    //     google: 'ADD_YOUR_GOOGLE_SEARCH_CONSOLE_CODE_HERE',
    // },
    category: 'Finance',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <meta name="google-adsense-account" content="ca-pub-2757390342181644" />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2757390342181644"
                    crossOrigin="anonymous"
                />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-XBZK7E1G01"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XBZK7E1G01');
                `,
                    }}
                />
            </head>
            <body className="antialiased">
                <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
