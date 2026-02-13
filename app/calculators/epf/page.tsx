import { Metadata } from 'next';
import EPFCalculatorClient from '@/components/calculators/EPFCalculatorClient';

export const metadata: Metadata = {
    title: 'EPF Calculator Online - Calculate Employees Provident Fund Returns | GoldRate24',
    description: 'Free EPF Calculator to calculate Employees Provident Fund maturity amount, pension, and returns. Plan your retirement with our online EPF calculator.',
    keywords: [
        'epf calculator',
        'employees provident fund calculator',
        'epf calculator online',
        'epf maturity calculator',
        'pf calculator',
        'provident fund calculator',
        'epf calculator 2024',
        'epf calculator india',
        'epf pension calculator',
        'eps calculator',
        'vpf calculator',
        'epf interest calculator',
        'epf withdrawal calculator',
        'retirement calculator india',
    ].join(', '),

    openGraph: {
        title: 'EPF Calculator - Calculate Employees Provident Fund Returns | GoldRate24',
        description: 'Plan your retirement with our EPF calculator. Calculate maturity amount, pension, and visualize your EPF growth.',
        type: 'website',
        url: 'https://goldrate24.in/calculators/epf',
        siteName: 'GoldRate24',
    },

    alternates: {
        canonical: 'https://goldrate24.in/calculators/epf',
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function EPFCalculatorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://goldrate24.in/calculators/epf#webpage',
                url: 'https://goldrate24.in/calculators/epf',
                name: 'EPF Calculator - Calculate Employees Provident Fund Returns Online',
                description: 'Free online EPF calculator to calculate Employees Provident Fund maturity amount and pension.',
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://goldrate24.in/calculators/epf#breadcrumb',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://goldrate24.in',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Calculator',
                        item: 'https://goldrate24.in/calculators',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'EPF Calculator',
                        item: 'https://goldrate24.in/calculators/epf',
                    },
                ],
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EPFCalculatorClient />
        </>
    );
}
