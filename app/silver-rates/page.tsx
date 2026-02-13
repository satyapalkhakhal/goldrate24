import type { Metadata } from 'next';
import SilverRatesPageContent from '@/components/silver-rates/SilverRatesPageContent';

export const metadata: Metadata = {
    title: 'Live Silver Rates Today India - Silver Price Per Gram | GoldRate24',
    description: 'Check today\'s live silver rates in India. Real-time silver prices per gram updated every hour across 18+ major cities including Mumbai, Delhi, Bangalore, Chennai, Hyderabad.',
    keywords: [
        'silver rate today',
        'silver price today india',
        'silver rate per gram',
        'live silver rates',
        'silver price india',
        'silver rate mumbai',
        'silver rate delhi',
        'silver rate bangalore',
        'silver rate per kg',
        '999 silver rate today',
        'silver price per gram today',
    ],
    alternates: {
        canonical: '/silver-rates',
    },
    openGraph: {
        title: 'Live Silver Rates Today - Silver Price Per Gram India',
        description: 'Real-time silver prices across 18+ Indian cities. Updated every hour with accurate rates per gram, 10g, 100g, and 1kg.',
        url: '/silver-rates',
        type: 'website',
        siteName: 'GoldRate24',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Live Silver Rates Today India',
        description: 'Real-time silver prices per gram across Indian cities',
    },
    robots: { index: true, follow: true },
};

export default function SilverRatesPage() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Live Silver Rates Today India',
        description: 'Real-time silver prices per gram across major Indian cities',
        url: 'https://goldrate24.in/silver-rates',
        mainEntity: {
            '@type': 'Product',
            name: 'Silver',
            description: '999 purity silver rates in India',
            category: 'Precious Metals',
        },
        publisher: {
            '@type': 'Organization',
            name: 'GoldRate24',
            url: 'https://goldrate24.in',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <SilverRatesPageContent />
        </>
    );
}
