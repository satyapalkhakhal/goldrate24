import { Metadata } from 'next';
import GoldCalculatorClient from '@/components/calculators/GoldCalculatorClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldrate24.in';

export const metadata: Metadata = {
    title: 'Gold Calculator Online - Calculate Gold Purchase Price with Making Charges & GST | GoldRate24',
    description: 'Free Gold Calculator to calculate the exact cost of gold purchase including weight, purity, making charges, GST, and discounts. Get accurate gold price calculation with detailed breakdown for 24K, 22K, 18K gold.',
    keywords: [
        'gold calculator', 'gold price calculator', 'gold calculator india', 'gold rate calculator',
        'gold purchase calculator', 'gold making charges calculator', 'gold weight calculator',
        'gold value calculator', '22k gold calculator', '24k gold calculator', 'gold gst calculator',
        'gold jewellery price calculator', 'gold cost calculator online', 'gold purity calculator',
    ].join(', '),
    openGraph: {
        title: 'Gold Calculator - Calculate Gold Purchase Price | GoldRate24',
        description: 'Calculate the total cost of gold purchase with making charges, GST, and discounts. Free online gold calculator.',
        type: 'website',
        url: `${baseUrl}/calculators/gold`,
        siteName: 'GoldRate24',
    },
    alternates: { canonical: `${baseUrl}/calculators/gold` },
    robots: { index: true, follow: true },
};

export default function GoldCalculatorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebApplication',
                name: 'Gold Calculator',
                description: 'Calculate the total cost of gold purchase including weight, purity, making charges, GST, and discounts.',
                applicationCategory: 'FinanceApplication',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${baseUrl}/calculators` },
                    { '@type': 'ListItem', position: 3, name: 'Gold Calculator', item: `${baseUrl}/calculators/gold` },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    { '@type': 'Question', name: 'How are gold making charges calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Making charges are typically 6-25% of the gold value depending on design complexity. They can be percentage-based or a fixed amount per gram.' } },
                    { '@type': 'Question', name: 'What is the GST on gold in India?', acceptedAnswer: { '@type': 'Answer', text: 'GST on gold in India is 3% on the value of gold plus making charges. This is a standard rate applicable across all states.' } },
                    { '@type': 'Question', name: 'What is the difference between 22K and 24K gold?', acceptedAnswer: { '@type': 'Answer', text: '24K gold is 99.9% pure gold, while 22K gold is 91.6% pure with 8.4% other metals mixed for durability. 22K is commonly used for jewellery while 24K is used for coins and bars.' } },
                ],
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <GoldCalculatorClient />
        </>
    );
}
