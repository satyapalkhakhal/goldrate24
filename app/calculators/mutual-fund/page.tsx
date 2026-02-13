import { Metadata } from 'next';
import MutualFundCalculatorClient from '@/components/calculators/MutualFundCalculatorClient';

export const metadata: Metadata = {
    title: 'Mutual Fund Calculator - Calculate MF Returns for SIP & Lumpsum | GoldRate24',
    description: 'Free mutual fund calculator to calculate returns for SIP and lumpsum investments. Estimate mutual fund returns, plan investments in equity, debt, and hybrid funds.',
    keywords: 'mutual fund calculator, mf calculator, mutual fund returns calculator, sip mutual fund calculator, lumpsum calculator, equity fund calculator, mutual fund investment calculator india',
    openGraph: {
        title: 'Mutual Fund Calculator - Calculate SIP & Lumpsum Returns | GoldRate24',
        description: 'Calculate mutual fund returns for SIP and lumpsum investments. Free MF calculator.',
        type: 'website',
        siteName: 'GoldRate24',
        url: 'https://goldrate24.in/calculators/mutual-fund',
    },
    alternates: {
        canonical: 'https://goldrate24.in/calculators/mutual-fund',
    },
    robots: { index: true, follow: true },
};

export default function MutualFundCalculatorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Mutual Fund Calculator',
        description: 'Calculate mutual fund returns for SIP and lumpsum investments in equity, debt, and hybrid funds.',
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
            <MutualFundCalculatorClient />
        </>
    );
}
