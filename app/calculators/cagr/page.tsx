import { Metadata } from 'next';
import CAGRCalculatorClient from '@/components/calculators/CAGRCalculatorClient';

export const metadata: Metadata = {
    title: 'CAGR Calculator - Compound Annual Growth Rate Calculator Online | GoldRate24',
    description: 'Free CAGR calculator to calculate Compound Annual Growth Rate for investments. Measure mean annual growth rate of stocks, mutual funds, and portfolios. Get instant CAGR calculation with detailed analysis.',
    keywords: 'cagr calculator, compound annual growth rate calculator, cagr calculator india, investment growth calculator, mutual fund cagr, stock cagr calculator, portfolio cagr, annual growth rate calculator, cagr formula, calculate cagr online, investment returns calculator',
    openGraph: {
        title: 'CAGR Calculator - Calculate Compound Annual Growth Rate | GoldRate24',
        description: 'Calculate CAGR for your investments instantly. Free online Compound Annual Growth Rate calculator for stocks, mutual funds, and portfolios.',
        type: 'website',
        siteName: 'GoldRate24',
        url: 'https://goldrate24.in/calculators/cagr',
    },
    alternates: {
        canonical: 'https://goldrate24.in/calculators/cagr',
    },
    robots: { index: true, follow: true },
};

export default function CAGRCalculatorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'CAGR Calculator',
        description: 'Calculate Compound Annual Growth Rate (CAGR) for investments. Measure mean annual growth rate of stocks, mutual funds, and portfolios.',
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
            <CAGRCalculatorClient />
        </>
    );
}
