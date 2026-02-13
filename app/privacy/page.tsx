import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - GoldRate24',
    description: 'Privacy Policy for GoldRate24 - Learn how we collect, use, and protect your personal information when you use our gold rate and financial calculator services.',
    openGraph: {
        title: 'Privacy Policy - GoldRate24',
        description: 'Learn how GoldRate24 collects, uses, and protects your personal information.',
        type: 'website',
        url: '/privacy',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy - GoldRate24',
        description: 'Learn how GoldRate24 handles your data and protects your privacy.',
    },
    alternates: {
        canonical: '/privacy',
    },
    robots: { index: true, follow: true },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Privacy <span className="text-gradient-gold">Policy</span>
                        </h1>
                        <p className="text-lg text-text-secondary">
                            Last updated: December 25, 2024
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8 md:p-12 prose prose-lg max-w-none">
                            <h2>1. Introduction</h2>
                            <p>
                                Welcome to GoldRate24 ("we," "our," or "us"). We are committed to protecting your personal
                                information and your right to privacy. This Privacy Policy explains how we collect, use,
                                disclose, and safeguard your information when you visit our website goldrate24.in.
                            </p>

                            <h2>2. Information We Collect</h2>

                            <h3>2.1 Information You Provide</h3>
                            <p>We may collect information that you voluntarily provide to us when you:</p>
                            <ul>
                                <li>Use our calculators and tools</li>
                                <li>Contact us via email or contact form</li>
                                <li>Subscribe to our newsletter</li>
                                <li>Participate in surveys or promotions</li>
                            </ul>

                            <h3>2.2 Automatically Collected Information</h3>
                            <p>When you visit our website, we automatically collect certain information, including:</p>
                            <ul>
                                <li>IP address and browser type</li>
                                <li>Operating system and device information</li>
                                <li>Pages visited and time spent on pages</li>
                                <li>Referring website addresses</li>
                                <li>Click patterns and navigation paths</li>
                            </ul>

                            <h3>2.3 Cookies and Tracking Technologies</h3>
                            <p>
                                We use cookies and similar tracking technologies to track activity on our website and
                                store certain information. You can instruct your browser to refuse all cookies or to
                                indicate when a cookie is being sent.
                            </p>

                            <h2>3. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul>
                                <li>Provide and maintain our services</li>
                                <li>Improve and personalize user experience</li>
                                <li>Analyze usage patterns and trends</li>
                                <li>Send periodic emails and updates (with your consent)</li>
                                <li>Respond to inquiries and support requests</li>
                                <li>Detect and prevent fraud or abuse</li>
                                <li>Comply with legal obligations</li>
                            </ul>

                            <h2>4. Google AdSense</h2>
                            <p>
                                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies
                                to serve ads based on your prior visits to our website or other websites. You may opt out of
                                personalized advertising by visiting{' '}
                                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                                    Google Ads Settings
                                </a>.
                            </p>

                            <h2>5. Third-Party Services</h2>
                            <p>We may use third-party services that collect, monitor, and analyze data, including:</p>
                            <ul>
                                <li>Google Analytics - for website analytics</li>
                                <li>Google AdSense - for advertising</li>
                                <li>Email service providers - for newsletters</li>
                            </ul>

                            <h2>6. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational security measures to protect your
                                personal information. However, no method of transmission over the Internet or electronic
                                storage is 100% secure.
                            </p>

                            <h2>7. Your Privacy Rights</h2>
                            <p>Depending on your location, you may have the following rights:</p>
                            <ul>
                                <li>Access to your personal information</li>
                                <li>Correction of inaccurate data</li>
                                <li>Deletion of your personal information</li>
                                <li>Objection to processing of your data</li>
                                <li>Data portability</li>
                                <li>Withdrawal of consent</li>
                            </ul>

                            <h2>8. Children's Privacy</h2>
                            <p>
                                Our website is not intended for children under 13 years of age. We do not knowingly collect
                                personal information from children under 13.
                            </p>

                            <h2>9. Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by
                                posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>

                            <h2>10. Contact Us</h2>
                            <p>If you have questions about this Privacy Policy, please contact us:</p>
                            <ul>
                                <li>Email: privacy@goldrate24.in</li>
                                <li>Website: goldrate24.in/contact</li>
                            </ul>

                            <div className="mt-8 p-6 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                <p className="text-sm text-amber-800 dark:text-amber-200 mb-0">
                                    <strong>Note:</strong> This privacy policy is provided as a template. Please consult with
                                    a legal professional to ensure it meets all applicable laws and regulations for your
                                    specific jurisdiction and business needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
