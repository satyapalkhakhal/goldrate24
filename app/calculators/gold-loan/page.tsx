import { Metadata } from 'next';
import GoldLoanCalculatorClient from '@/components/calculators/GoldLoanCalculatorClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldrate24.in';

export const metadata: Metadata = {
    title: 'Gold Loan Calculator Online - Calculate Gold Loan EMI & Eligibility | GoldRate24',
    description: 'Free Gold Loan Calculator to calculate gold loan amount, EMI, interest, and eligibility based on gold weight and purity. Compare gold loan interest rates and plan your gold loan repayment.',
    keywords: [
        'gold loan calculator', 'gold loan emi calculator', 'gold loan interest rate calculator',
        'gold loan eligibility calculator', 'gold loan calculator india', 'gold loan amount calculator',
        'sbi gold loan calculator', 'muthoot gold loan calculator', 'manappuram gold loan calculator',
        'gold loan repayment calculator', 'gold per gram loan calculator', 'gold loan ltv calculator',
    ].join(', '),
    openGraph: {
        title: 'Gold Loan Calculator - Calculate Gold Loan Amount & EMI | GoldRate24',
        description: 'Calculate gold loan eligibility, EMI, and interest based on gold weight and purity. Free online gold loan calculator.',
        type: 'website',
        url: `${baseUrl}/calculators/gold-loan`,
        siteName: 'GoldRate24',
    },
    alternates: { canonical: `${baseUrl}/calculators/gold-loan` },
    robots: { index: true, follow: true },
};

export default function GoldLoanCalculatorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebApplication',
                name: 'Gold Loan Calculator',
                description: 'Calculate gold loan amount, EMI, and interest based on gold weight, purity, and LTV ratio.',
                applicationCategory: 'FinanceApplication',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${baseUrl}/calculators` },
                    { '@type': 'ListItem', position: 3, name: 'Gold Loan Calculator', item: `${baseUrl}/calculators/gold-loan` },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    { '@type': 'Question', name: 'What is LTV ratio in gold loan?', acceptedAnswer: { '@type': 'Answer', text: 'LTV (Loan-to-Value) ratio is the percentage of gold value that a bank or NBFC will lend. RBI has set the maximum LTV for gold loans at 75%.' } },
                    { '@type': 'Question', name: 'What factors affect gold loan eligibility?', acceptedAnswer: { '@type': 'Answer', text: 'Gold loan eligibility depends on gold weight, purity (22K/24K), current gold rate, and the LTV ratio offered by the lender. Higher purity and weight mean higher loan amount.' } },
                ],
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <GoldLoanCalculatorClient />
        </>
    );
}
