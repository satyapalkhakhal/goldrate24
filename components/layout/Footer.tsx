import Link from 'next/link';
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
    product: [
        { name: 'Gold Rates', href: '/gold-rates' },
        { name: 'Silver Rates', href: '/silver-rates' },
        { name: 'Gold Calculator', href: '/calculators/gold' },
        { name: 'Home Loan Calculator', href: '/calculators/home-loan' },
        { name: 'Gold Loan Calculator', href: '/calculators/gold-loan' },
    ],
    cities: [
        { name: 'Mumbai', href: '/cities/mumbai' },
        { name: 'Delhi', href: '/cities/delhi' },
        { name: 'Bangalore', href: '/cities/bangalore' },
        { name: 'Chennai', href: '/cities/chennai' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ],
};

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
            <div className="container-custom">
                {/* Main Footer Content */}
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex items-center gap-2 group mb-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                                    <div className="relative bg-gradient-to-br from-amber-500 to-yellow-600 p-2 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <span className="text-xl font-bold text-gradient-gold">
                                    GoldRate24
                                </span>
                            </Link>
                            <p className="text-slate-400 mb-6 max-w-md">
                                Your trusted source for real-time gold rates and comprehensive financial calculators.
                                Make informed investment decisions with accurate, up-to-date information.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-amber-500" />
                                    <a href="mailto:info@goldrate24.in" className="hover:text-amber-400 transition-colors">
                                        info@goldrate24.in
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-amber-500" />
                                    <a href="tel:+911234567890" className="hover:text-amber-400 transition-colors">
                                        +91 123 456 7890
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-amber-500" />
                                    <span>Mumbai, India</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Product</h3>
                            <ul className="space-y-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm hover:text-amber-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cities Links */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Cities</h3>
                            <ul className="space-y-3">
                                {footerLinks.cities.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm hover:text-amber-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Company</h3>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm hover:text-amber-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-400">
                            © {currentYear} GoldRate24. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="p-2 rounded-lg bg-slate-800 hover:bg-amber-500 text-slate-400 hover:text-white transition-all duration-300"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="pb-6">
                    <p className="text-xs text-slate-500 text-center max-w-4xl mx-auto">
                        <strong>Disclaimer:</strong> Gold rates displayed are indicative and may vary from actual market rates.
                        Please verify current rates with your local jeweler before making any purchase.
                        GoldRate24 is not responsible for any investment decisions made based on this information.
                    </p>
                </div>
            </div>
        </footer>
    );
}
