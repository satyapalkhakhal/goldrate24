import type { Metadata } from 'next';
import GoldRatesPageContent from '@/components/gold-rates/GoldRatesPageContent';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
    title: 'Live Gold Rates Today India - 24K, 22K, 18K Gold Price Per Gram | GoldRate24',
    description: 'Check today\'s live gold rates in India for 24K, 22K, and 18K gold. Real-time gold prices updated every 12 hours across 10+ major cities including Mumbai, Delhi, Bangalore, Chennai. Accurate gold rate per gram.',
    keywords: [
        'live gold rates',
        'gold rates today',
        'gold price today india',
        '24k gold rate today',
        '22k gold rate today',
        '18k gold rate today',
        'gold rate per gram',
        'today gold rate',
        'gold price per gram',
        'current gold rate',
        'gold rate india',
        'gold rate mumbai',
        'gold rate delhi',
        'gold rate bangalore',
    ],
    alternates: {
        canonical: '/gold-rates',
    },
    openGraph: {
        title: 'Live Gold Rates Today - 24K, 22K, 18K Gold Price India',
        description: 'Real-time gold prices for 24K, 22K, and 18K gold across India. Updated every 12 hours with accurate rates in 10+ major cities.',
        url: '/gold-rates',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Live Gold Rates Today India',
        description: '24K, 22K, and 18K gold prices updated every 12 hours',
    },
};

export default function GoldRatesPage() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Live Gold Rates Today India',
        description: 'Real-time gold prices for 24K, 22K, and 18K gold across India',
        url: 'https://goldrate24.in/gold-rates',
        mainEntity: {
            '@type': 'ItemList',
            name: 'Gold Rates in Indian Cities',
            description: 'Live gold rates across major Indian cities',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Mumbai Gold Rate',
                    url: 'https://goldrate24.in/cities/mumbai',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Delhi Gold Rate',
                    url: 'https://goldrate24.in/cities/delhi',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Bangalore Gold Rate',
                    url: 'https://goldrate24.in/cities/bangalore',
                },
                {
                    '@type': 'ListItem',
                    position: 4,
                    name: 'Chennai Gold Rate',
                    url: 'https://goldrate24.in/cities/chennai',
                },
                {
                    '@type': 'ListItem',
                    position: 5,
                    name: 'Hyderabad Gold Rate',
                    url: 'https://goldrate24.in/cities/hyderabad',
                },
                {
                    '@type': 'ListItem',
                    position: 6,
                    name: 'Kolkata Gold Rate',
                    url: 'https://goldrate24.in/cities/kolkata',
                },
            ],
        },
    };

    return (
        <>
            <StructuredData type="custom" data={structuredData} />
            <GoldRatesPageContent />
        </>
    );
}
