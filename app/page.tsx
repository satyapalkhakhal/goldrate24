import GoldRatesDashboard from '@/components/home/GoldRatesDashboard';
import GoldRateHistory from '@/components/home/GoldRateHistory';
import QuickCalculator from '@/components/home/QuickCalculator';
import Features from '@/components/home/Features';
import CityRates from '@/components/home/CityRates';
import BusinessNews from '@/components/home/BusinessNews';
import TrustIndicators from '@/components/home/TrustIndicators';
import StructuredData from '@/components/seo/StructuredData';

export default function HomePage() {
    return (
        <>
            <StructuredData
                type="website"
                data={{
                    name: 'GoldRate24',
                    url: 'https://goldrate24.in',
                    description: 'Check today\'s live gold rate in India for 24K, 22K, and 18K gold. Get real-time gold prices in 100+ cities with free calculator.',
                }}
            />
            <StructuredData
                type="localBusiness"
                data={{
                    name: 'GoldRate24',
                    description: 'Real-time gold rates and financial calculators for India',
                    url: 'https://goldrate24.in',
                    logo: 'https://goldrate24.in/icon.png',
                }}
            />
            <GoldRatesDashboard />
            <GoldRateHistory />
            <QuickCalculator />
            <Features />
            <CityRates />
            <BusinessNews />
            <TrustIndicators />
        </>
    );
}
