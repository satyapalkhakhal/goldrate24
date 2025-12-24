import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Home, Coins, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Financial Calculators - Gold, Home Loan & Gold Loan EMI Calculator',
    description: 'Free online calculators for gold purchase (with making charges & GST), home loan EMI, and gold loan calculations. Accurate, easy-to-use financial tools for smart investment decisions in India.',
    keywords: [
        'gold calculator',
        'gold price calculator',
        'gold calculator with making charges',
        'home loan calculator',
        'home loan emi calculator',
        'gold loan calculator',
        'emi calculator',
        'loan calculator',
        'financial calculator',
        'gold purchase calculator',
        'gold calculator india',
    ],
    alternates: {
        canonical: '/calculators',
    },
    openGraph: {
        title: 'Free Financial Calculators | Gold, Home Loan & Gold Loan',
        description: 'Calculate gold purchase cost, home loan EMI, and gold loan amount with our free online calculators. Accurate results with detailed breakdowns.',
        url: '/calculators',
        type: 'website',
    },
};

const calculators = [
    {
        title: 'Gold Calculator',
        description: 'Calculate the total cost of your gold purchase including weight, rate, making charges, and GST.',
        icon: Coins,
        href: '/calculators/gold',
        color: 'from-amber-500 to-yellow-500',
        features: ['Weight calculation', 'Making charges', 'GST calculation', 'Price breakdown'],
    },
    {
        title: 'Home Loan Calculator',
        description: 'Calculate your home loan EMI, total interest, and repayment schedule with detailed amortization.',
        icon: Home,
        href: '/calculators/home-loan',
        color: 'from-blue-500 to-cyan-500',
        features: ['EMI calculation', 'Interest breakdown', 'Amortization schedule', 'Prepayment analysis'],
    },
    {
        title: 'Gold Loan Calculator',
        description: 'Calculate gold loan amount, interest, and repayment based on your gold weight and purity.',
        icon: TrendingUp,
        href: '/calculators/gold-loan',
        color: 'from-green-500 to-emerald-500',
        features: ['Loan amount', 'Interest calculation', 'Repayment schedule', 'LTV ratio'],
    },
];

export default function CalculatorsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 mb-6">
                            <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                                Free Financial Tools
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Financial <span className="text-gradient-gold">Calculators</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary">
                            Make informed financial decisions with our comprehensive suite of calculators.
                            Accurate, easy-to-use, and completely free.
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculators Grid */}
            <section className="section">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {calculators.map((calc, index) => {
                            const Icon = calc.icon;
                            return (
                                <Link
                                    key={calc.href}
                                    href={calc.href}
                                    className="card-hover p-8 group"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    {/* Icon */}
                                    <div className="relative mb-6">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${calc.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                                        <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${calc.color} w-fit`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {calc.title}
                                    </h2>

                                    <p className="text-text-secondary mb-6">
                                        {calc.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2">
                                        {calc.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-text-tertiary">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <span className="text-primary font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                                            Start Calculating
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
