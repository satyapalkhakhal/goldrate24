import React from 'react';

interface StructuredDataProps {
    type: 'website' | 'localBusiness' | 'breadcrumb' | 'faq' | 'product' | 'custom';
    data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
    let schema: any = {};

    switch (type) {
        case 'website':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: data.name || 'GoldRate24',
                url: data.url || 'https://goldrate24.in',
                description: data.description || 'Live gold rates and financial calculators for India',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${data.url || 'https://goldrate24.in'}/cities/{search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                },
            };
            break;

        case 'localBusiness':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'FinancialService',
                name: data.name || 'GoldRate24',
                description: data.description || 'Real-time gold rates and financial calculators',
                url: data.url || 'https://goldrate24.in',
                logo: data.logo || 'https://goldrate24.in/icon.png',
                sameAs: data.sameAs || [],
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'IN',
                },
                areaServed: {
                    '@type': 'Country',
                    name: 'India',
                },
                serviceType: ['Gold Rate Information', 'Financial Calculators', 'Gold Price Tracking'],
            };
            break;

        case 'breadcrumb':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: data.items.map((item: any, index: number) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: item.name,
                    item: item.url,
                })),
            };
            break;

        case 'faq':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: data.questions.map((q: any) => ({
                    '@type': 'Question',
                    name: q.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: q.answer,
                    },
                })),
            };
            break;

        case 'product':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: data.name,
                description: data.description,
                offers: {
                    '@type': 'AggregateOffer',
                    priceCurrency: 'INR',
                    lowPrice: data.lowPrice,
                    highPrice: data.highPrice,
                    offerCount: data.offerCount || 1,
                },
            };
            break;

        case 'custom':
            // For custom structured data, use the data as-is
            schema = data;
            break;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
