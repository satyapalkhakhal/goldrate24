import { Calculator, TrendingUp, Shield, Clock, BarChart3, Bell } from 'lucide-react';

const features = [
    {
        icon: TrendingUp,
        title: 'Real-Time Updates',
        description: 'Get live gold rates updated every hour from reliable sources across India.',
        color: 'from-amber-500 to-yellow-500',
    },
    {
        icon: Calculator,
        title: 'Advanced Calculators',
        description: 'Comprehensive calculators for gold purchases, home loans, and gold loans with detailed breakdowns.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Shield,
        title: 'Accurate & Reliable',
        description: '99.9% accuracy with data sourced from verified jewelers and market authorities.',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: Clock,
        title: '24/7 Availability',
        description: 'Access gold rates and calculators anytime, anywhere, on any device.',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: BarChart3,
        title: 'Historical Data',
        description: 'Track gold price trends with historical charts and analytics for better investment decisions.',
        color: 'from-orange-500 to-red-500',
    },
    {
        icon: Bell,
        title: 'Price Alerts',
        description: 'Set custom price alerts and get notified when gold reaches your target price.',
        color: 'from-indigo-500 to-blue-500',
    },
];

export default function Features() {
    return (
        <section className="section bg-gradient-to-b from-surface to-background">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="section-title">Why Choose GoldRate24?</h2>
                    <p className="section-subtitle">
                        Everything you need to make informed gold investment decisions
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="card-hover p-6 group"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                {/* Icon */}
                                <div className="relative mb-4">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity`} />
                                    <div className={`relative p-3 rounded-xl bg-gradient-to-r ${feature.color} w-fit`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-text-secondary">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
