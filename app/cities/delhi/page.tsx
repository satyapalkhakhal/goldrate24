import type { Metadata } from 'next';
import CityPageContent from '@/components/cities/CityPageContent';
import StructuredData from '@/components/seo/StructuredData';

const CITY_NAME = 'Delhi';
const STATE_NAME = 'Delhi';
const CITY_SLUG = 'delhi';

const OTHER_CITIES = [
    { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu' },
    { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra' },
    { name: 'Pune', slug: 'pune', state: 'Maharashtra' },
    { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana' },
    { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka' },
    { name: 'Coimbatore', slug: 'coimbatore', state: 'Tamil Nadu' },
    { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal' },
    { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat' },
    { name: 'Kerala', slug: 'kerala', state: 'Kerala' },
];

export const metadata: Metadata = {
    title: `Gold Rate in ${CITY_NAME} Today - ${STATE_NAME} | 24K, 22K, 18K Gold Price | GoldRate24`,
    description: `Today's live gold rate in ${CITY_NAME}, ${STATE_NAME}. Check 24K, 22K, and 18K gold prices per gram. Updated every 12 hours with accurate market rates.`,
    keywords: [
        `gold rate in ${CITY_NAME.toLowerCase()}`,
        `gold price in ${CITY_NAME.toLowerCase()}`,
        `${CITY_NAME.toLowerCase()} gold rate today`,
        `24k gold rate ${CITY_NAME.toLowerCase()}`,
        `22k gold rate ${CITY_NAME.toLowerCase()}`,
        `live gold price ${CITY_NAME.toLowerCase()}`,
        `${STATE_NAME.toLowerCase()} gold rate`,
    ],
    openGraph: {
        title: `Gold Rate in ${CITY_NAME} Today | Live Gold Prices`,
        description: `Live gold prices in ${CITY_NAME}: 24K, 22K, and 18K gold rates. Updated every 12 hours.`,
        type: 'website',
        siteName: 'GoldRate24',
        url: `/cities/${CITY_SLUG}`,
    },
    twitter: {
        card: 'summary_large_image',
        title: `Gold Rate in ${CITY_NAME} Today`,
        description: `Live 24K, 22K, and 18K gold prices in ${CITY_NAME}`,
    },
    alternates: {
        canonical: `/cities/${CITY_SLUG}`,
    },
};

export default function DelhiPage() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'LocalBusiness',
                name: `Gold Rate in ${CITY_NAME}`,
                description: `Live gold rates and prices in ${CITY_NAME}, ${STATE_NAME}`,
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: CITY_NAME,
                    addressRegion: STATE_NAME,
                    addressCountry: 'IN',
                },
            },
            {
                '@type': 'BreadcrumbList',
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
                        name: 'Cities',
                        item: 'https://goldrate24.in/cities',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: CITY_NAME,
                        item: `https://goldrate24.in/cities/${CITY_SLUG}`,
                    },
                ],
            },
        ],
    robots: { index: true, follow: true },
    };

    return (
        <>
            <StructuredData type="custom" data={structuredData} />
            <CityPageContent cityName={CITY_NAME} stateName={STATE_NAME} otherCities={OTHER_CITIES} />
        </>
    );
}
