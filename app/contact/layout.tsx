import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - GoldRate24 | Get in Touch',
    description:
        'Contact GoldRate24 for questions about gold rates, calculators, or partnership inquiries. We respond within 24-48 hours.',
    keywords: [
        'contact goldrate24',
        'gold rate enquiry',
        'gold price support',
        'gold calculator help',
    ],
    openGraph: {
        title: 'Contact Us - GoldRate24',
        description: 'Have questions about gold rates or calculators? Get in touch with the GoldRate24 team.',
        type: 'website',
        url: '/contact',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us - GoldRate24',
        description: 'Get in touch with the GoldRate24 team for gold rate enquiries and calculator support.',
    },
    alternates: {
        canonical: '/contact',
    },
    robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
