import { Metadata } from 'next';
import SimpleInterestCalculatorClient from '@/components/calculators/SimpleInterestCalculatorClient';

export const metadata: Metadata = {
    title: 'Simple Interest Calculator - Calculate SI Online | GoldRate24',
    description: 'Free simple interest calculator to calculate SI on loans and deposits. Find interest amount and total payable using SI formula. Easy and accurate simple interest calculation.',
    keywords: 'simple interest calculator, si calculator, simple interest formula calculator, loan interest calculator, simple interest calculator india, calculate simple interest online',
    openGraph: {
        title: 'Simple Interest Calculator - Calculate SI Online | GoldRate24',
        description: 'Calculate simple interest on loans and deposits instantly. Free SI calculator.',
        type: 'website',
        siteName: 'GoldRate24',
        url: 'https://goldrate24.in/calculators/simple-interest',
    },
    alternates: {
        canonical: 'https://goldrate24.in/calculators/simple-interest',
    },
    robots: { index: true, follow: true },
};

export default function SimpleInterestCalculatorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Simple Interest Calculator',
        description: 'Calculate simple interest on loans and deposits using SI formula.',
        applicationCategory: 'FinanceApplication',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'IN',
                returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
            },
        },
        robots: { index: true, follow: true },
};

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SimpleInterestCalculatorClient />
        </>
    );
}
