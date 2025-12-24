import { Shield, Award, Users, CheckCircle } from 'lucide-react';

const indicators = [
    {
        icon: Shield,
        title: 'Verified Sources',
        description: 'All rates sourced from certified jewelers and official market authorities',
    },
    {
        icon: Award,
        title: 'Industry Trusted',
        description: 'Trusted by over 50,000+ users and leading financial advisors',
    },
    {
        icon: Users,
        title: 'Expert Team',
        description: 'Backed by financial experts with 15+ years of market experience',
    },
    {
        icon: CheckCircle,
        title: 'Data Accuracy',
        description: '99.9% accuracy rate with real-time verification systems',
    },
];

export default function TrustIndicators() {
    return (
        <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        Your reliable partner for accurate gold rates and financial calculations
                    </p>
                </div>

                {/* Trust Indicators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {indicators.map((indicator, index) => {
                        const Icon = indicator.icon;
                        return (
                            <div
                                key={index}
                                className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                            >
                                {/* Icon */}
                                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 mb-4">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-bold mb-2">
                                    {indicator.title}
                                </h3>
                                <p className="text-sm text-slate-400">
                                    {indicator.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Trust Elements */}
                <div className="mt-12 pt-12 border-t border-slate-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                                50K+
                            </div>
                            <div className="text-sm text-slate-400">
                                Active Users
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                                100+
                            </div>
                            <div className="text-sm text-slate-400">
                                Cities Covered
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                                1M+
                            </div>
                            <div className="text-sm text-slate-400">
                                Calculations Done
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                                24/7
                            </div>
                            <div className="text-sm text-slate-400">
                                Support Available
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
