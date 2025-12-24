import Link from 'next/link';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-300/20 dark:bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container-custom py-16 md:py-24 lg:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 mb-6 animate-fade-in">
                        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                            Real-time Gold Rates Updated Every Hour
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-slide-up">
                        Track <span className="text-gradient-gold">Gold Rates</span>
                        <br />
                        Make Smart Investments
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Get real-time gold prices for 24K, 22K, and 18K gold across India.
                        Access powerful calculators for gold investments, home loans, and gold loans.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link href="/gold-rates" className="btn-primary group w-full sm:w-auto">
                            View Live Rates
                            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/calculators/gold" className="btn-secondary w-full sm:w-auto group">
                            Try Calculator
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        {[
                            { value: '50K+', label: 'Daily Users' },
                            { value: '100+', label: 'Cities Covered' },
                            { value: '99.9%', label: 'Accuracy' },
                            { value: '24/7', label: 'Live Updates' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-gradient-gold mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-text-tertiary">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </section>
    );
}
