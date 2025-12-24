import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for GoldRate24 - Read our terms and conditions for using our website and services.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Terms of <span className="text-gradient-gold">Service</span>
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
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using GoldRate24 ("the Website"), you accept and agree to be bound by the
                                terms and provisions of this agreement. If you do not agree to these terms, please do not
                                use this website.
                            </p>

                            <h2>2. Use of Service</h2>

                            <h3>2.1 Permitted Use</h3>
                            <p>You may use our website for:</p>
                            <ul>
                                <li>Viewing current gold rates and market information</li>
                                <li>Using our calculators for personal financial planning</li>
                                <li>Reading educational content about gold investments</li>
                                <li>Accessing city-specific gold rate information</li>
                            </ul>

                            <h3>2.2 Prohibited Use</h3>
                            <p>You agree not to:</p>
                            <ul>
                                <li>Use the website for any illegal purpose</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Transmit any viruses, malware, or harmful code</li>
                                <li>Scrape or copy content without permission</li>
                                <li>Impersonate any person or entity</li>
                                <li>Interfere with the proper functioning of the website</li>
                            </ul>

                            <h2>3. Information Accuracy</h2>

                            <h3>3.1 Gold Rates</h3>
                            <p>
                                The gold rates displayed on our website are for informational purposes only. While we strive
                                to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness,
                                or timeliness of the rates shown.
                            </p>

                            <h3>3.2 Calculator Results</h3>
                            <p>
                                Results from our calculators are estimates based on the inputs you provide. These should not
                                be considered as financial advice or guaranteed outcomes. Always verify calculations with
                                professional financial advisors.
                            </p>

                            <h2>4. Disclaimer of Warranties</h2>
                            <p>
                                THE WEBSITE AND ALL INFORMATION, CONTENT, MATERIALS, AND SERVICES ARE PROVIDED "AS IS"
                                WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES,
                                INCLUDING BUT NOT LIMITED TO:
                            </p>
                            <ul>
                                <li>Accuracy or reliability of information</li>
                                <li>Fitness for a particular purpose</li>
                                <li>Non-infringement of third-party rights</li>
                                <li>Uninterrupted or error-free service</li>
                            </ul>

                            <h2>5. Limitation of Liability</h2>
                            <p>
                                IN NO EVENT SHALL GOLDRATE24, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR
                                ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR
                                RELATING TO YOUR USE OF THE WEBSITE.
                            </p>

                            <h2>6. Investment Disclaimer</h2>
                            <p>
                                GoldRate24 does not provide investment advice. All information on this website is for
                                educational and informational purposes only. You should consult with qualified financial
                                advisors before making any investment decisions.
                            </p>

                            <h2>7. Third-Party Links</h2>
                            <p>
                                Our website may contain links to third-party websites. We are not responsible for the
                                content, accuracy, or practices of these external sites. Accessing third-party links is
                                at your own risk.
                            </p>

                            <h2>8. Intellectual Property</h2>
                            <p>
                                All content on this website, including text, graphics, logos, images, and software, is the
                                property of GoldRate24 or its content suppliers and is protected by copyright and other
                                intellectual property laws.
                            </p>

                            <h2>9. User Content</h2>
                            <p>
                                If you submit any content to our website (comments, feedback, etc.), you grant us a
                                non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and
                                distribute such content.
                            </p>

                            <h2>10. Privacy</h2>
                            <p>
                                Your use of the website is also governed by our Privacy Policy. Please review our
                                Privacy Policy to understand our practices.
                            </p>

                            <h2>11. Modifications to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms of Service at any time. Changes will be
                                effective immediately upon posting. Your continued use of the website after changes
                                constitutes acceptance of the modified terms.
                            </p>

                            <h2>12. Termination</h2>
                            <p>
                                We reserve the right to terminate or suspend your access to the website at any time,
                                without notice, for conduct that we believe violates these Terms of Service or is
                                harmful to other users, us, or third parties.
                            </p>

                            <h2>13. Governing Law</h2>
                            <p>
                                These Terms of Service shall be governed by and construed in accordance with the laws
                                of India, without regard to its conflict of law provisions.
                            </p>

                            <h2>14. Contact Information</h2>
                            <p>If you have questions about these Terms of Service, please contact us:</p>
                            <ul>
                                <li>Email: legal@goldrate24.in</li>
                                <li>Website: goldrate24.in/contact</li>
                            </ul>

                            <div className="mt-8 p-6 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                <p className="text-sm text-amber-800 dark:text-amber-200 mb-0">
                                    <strong>Legal Notice:</strong> This Terms of Service document is provided as a template.
                                    Please consult with a legal professional to ensure it meets all applicable laws and
                                    regulations for your specific jurisdiction and business needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
