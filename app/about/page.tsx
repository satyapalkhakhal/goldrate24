import type { Metadata } from 'next';
import { Shield, Target, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About GoldRate24 - Your Trusted Gold Rate Source in India',
    description: 'Learn about GoldRate24 - your trusted source for real-time gold rates and financial calculators across India. Accurate prices for 24K, 22K, 18K gold.',
    keywords: [
        'about goldrate24',
        'gold rate india website',
        'gold price tracker',
        'goldrate24 team',
    ],
    openGraph: {
        title: 'About GoldRate24 - Trusted Gold Rate Source',
        description: 'GoldRate24 provides real-time gold rates and financial calculators for India. Learn about our mission and values.',
        type: 'website',
        url: '/about',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About GoldRate24',
        description: 'Your trusted source for real-time gold rates and financial calculators across India.',
    },
    alternates: {
        canonical: '/about',
    },
    robots: { index: true, follow: true },
};

const values = [
    {
        icon: Shield,
        title: 'Accuracy',
        description: 'We ensure 99.9% accuracy by sourcing data from verified jewelers and official market authorities.',
    },
    {
        icon: Target,
        title: 'Transparency',
        description: 'Clear, honest information with no hidden charges or misleading data.',
    },
    {
        icon: Users,
        title: 'User-Centric',
        description: 'Built with user needs in mind, providing tools that actually help make informed decisions.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description: 'Committed to delivering the best user experience with continuous improvements.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            About <span className="text-gradient-gold">GoldRate24</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary">
                            Your trusted partner for accurate gold rates and smart financial decisions
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8 md:p-12">
                            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                            <p className="text-lg text-text-secondary text-center mb-8">
                                To empower individuals and businesses with accurate, real-time gold rate information
                                and comprehensive financial calculators, enabling informed investment decisions across India.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-gradient-gold mb-2">10+</div>
                                    <div className="text-sm text-text-secondary">Cities Covered</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-gradient-gold mb-2">15+</div>
                                    <div className="text-sm text-text-secondary">Financial Calculators</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-gradient-gold mb-2">3</div>
                                    <div className="text-sm text-text-secondary">Gold Purities Tracked</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="section-title">Our Values</h2>
                        <p className="section-subtitle">
                            The principles that guide everything we do
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <div key={index} className="card-hover p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex-shrink-0">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                                <p className="text-text-secondary">{value.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="card p-8 md:p-12">
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-text-secondary mb-4">
                                    GoldRate24 was founded with a simple vision: to make gold rate information
                                    accessible, accurate, and actionable for everyone in India.
                                </p>
                                <p className="text-text-secondary mb-4">
                                    We noticed that people often struggled to find reliable, up-to-date gold prices
                                    and lacked tools to calculate the true cost of their gold purchases. This gap
                                    inspired us to create a platform that not only provides real-time gold rates
                                    but also offers powerful calculators for informed decision-making.
                                </p>
                                <p className="text-text-secondary">
                                    Today, we cover 10+ major Indian cities and offer 15+ financial calculators,
                                    helping users make smarter investment decisions with confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
