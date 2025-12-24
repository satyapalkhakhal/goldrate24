import Hero from '@/components/home/Hero';
import GoldRatesDashboard from '@/components/home/GoldRatesDashboard';
import QuickCalculator from '@/components/home/QuickCalculator';
import Features from '@/components/home/Features';
import CityRates from '@/components/home/CityRates';
import TrustIndicators from '@/components/home/TrustIndicators';

export default function HomePage() {
    return (
        <>
            <Hero />
            <GoldRatesDashboard />
            <QuickCalculator />
            <Features />
            <CityRates />
            <TrustIndicators />
        </>
    );
}
