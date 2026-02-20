'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Gold Rates', href: '/gold-rates' },
    { name: 'Silver Rates', href: '/silver-rates' },
    { name: 'Calculators', href: '/calculators' },
    { name: 'Cities', href: '/cities' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'About', href: '/about' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-amber-500 to-yellow-600 p-2 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-gradient-gold">
                            GoldRate24
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-text-secondary hover:text-primary font-medium transition-colors duration-200 relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link href="/calculators/gold" className="btn-primary">
                            Calculate Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 animate-fade-in">
                        <div className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-text-secondary hover:text-primary font-medium transition-colors px-4 py-2 rounded-lg hover:bg-surface-elevated"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/calculators/gold"
                                className="btn-primary mx-4"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Calculate Now
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
