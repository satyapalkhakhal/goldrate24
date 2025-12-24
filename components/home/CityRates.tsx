import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const cities = [
    { name: 'Mumbai', slug: 'mumbai', rate: 6520, change: 25 },
    { name: 'Delhi', slug: 'delhi', rate: 6515, change: 30 },
    { name: 'Bangalore', slug: 'bangalore', rate: 6525, change: 20 },
    { name: 'Chennai', slug: 'chennai', rate: 6530, change: 15 },
    { name: 'Kolkata', slug: 'kolkata', rate: 6510, change: 35 },
    { name: 'Hyderabad', slug: 'hyderabad', rate: 6518, change: 28 },
    { name: 'Pune', slug: 'pune', rate: 6522, change: 22 },
    { name: 'Ahmedabad', slug: 'ahmedabad', rate: 6512, change: 32 },
];

export default function CityRates() {
    return (
        <section className="section">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="section-title">Gold Rates by City</h2>
                    <p className="section-subtitle">
                        Check today's gold rates in major cities across India
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {cities.map((city, index) => {
                        const isPositive = city.change >= 0;
                        return (
                            <Link
                                key={city.slug}
                                href={`/cities/${city.slug}`}
                                className="card-hover p-6 group"
                                style={{
                                    animationDelay: `${index * 0.05}s`,
                                }}
                            >
                                {/* City Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                            {city.name}
                                        </h3>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>

                                {/* Rate */}
                                <div className="mb-2">
                                    <div className="text-2xl font-bold text-gradient-gold">
                                        ₹{city.rate.toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-xs text-text-tertiary">
                                        per gram (22K)
                                    </div>
                                </div>

                                {/* Change */}
                                <div className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-error'
                                    }`}>
                                    {isPositive ? '+' : ''}₹{city.change}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* View All Link */}
                <div className="text-center mt-8">
                    <Link href="/cities" className="btn-outline group">
                        View All Cities
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
