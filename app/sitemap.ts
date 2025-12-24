import { MetadataRoute } from 'next';

// City data - should match your actual city data
const cities = [
    'mumbai',
    'delhi',
    'bangalore',
    'chennai',
    'kolkata',
    'hyderabad',
    'pune',
    'ahmedabad',
    'jaipur',
    'lucknow',
    'chandigarh',
    'kochi',
    'surat',
    'nagpur',
    'indore',
    'thane',
    'bhopal',
    'visakhapatnam',
    'pimpri-chinchwad',
    'patna',
    'vadodara',
    'ghaziabad',
    'ludhiana',
    'agra',
    'nashik',
    'faridabad',
    'meerut',
    'rajkot',
    'kalyan-dombivali',
    'vasai-virar',
    'varanasi',
    'srinagar',
    'aurangabad',
    'dhanbad',
    'amritsar',
    'navi-mumbai',
    'allahabad',
    'ranchi',
    'howrah',
    'coimbatore',
    'jabalpur',
    'gwalior',
    'vijayawada',
    'jodhpur',
    'madurai',
    'raipur',
    'kota',
    'guwahati',
    'chandigarh',
    'solapur',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldrate24.in';

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'hourly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/gold-rates`,
            lastModified: new Date(),
            changeFrequency: 'hourly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/calculators`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/calculators/gold`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/calculators/home-loan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/calculators/gold-loan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/cities`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
    ];

    // Dynamic city pages
    const cityPages = cities.map((city) => ({
        url: `${baseUrl}/cities/${city}`,
        lastModified: new Date(),
        changeFrequency: 'hourly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...cityPages];
}
