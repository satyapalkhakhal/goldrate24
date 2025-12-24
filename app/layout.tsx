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
        default: 'GoldRate24 - Live Gold Rates & Financial Calculators',
        template: '%s | GoldRate24'
    },
    description: 'Get real-time gold rates for 24K, 22K, and 18K gold. Access powerful financial calculators for gold investments, home loans, and gold loans. City-specific gold prices across India.',
    keywords: ['gold rate', 'gold price', 'gold calculator', 'gold rate today', '24k gold', '22k gold', 'gold loan calculator', 'home loan calculator'],
    authors: [{ name: 'GoldRate24' }],
    creator: 'GoldRate24',
    publisher: 'GoldRate24',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldrate24.in'),
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: '/',
        siteName: 'GoldRate24',
        title: 'GoldRate24 - Live Gold Rates & Financial Calculators',
        description: 'Get real-time gold rates and powerful financial calculators for gold investments across India.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GoldRate24 - Live Gold Rates & Financial Calculators',
        description: 'Get real-time gold rates and powerful financial calculators for gold investments across India.',
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
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <head>
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
