'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, send this to your backend/email service
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Get in <span className="text-gradient-gold">Touch</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Contact Information */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="card p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex-shrink-0">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-2">Email Us</h3>
                                            <p className="text-sm text-text-secondary mb-2">
                                                For general inquiries and support
                                            </p>
                                            <a
                                                href="mailto:info@goldrate24.in"
                                                className="text-primary hover:underline"
                                            >
                                                info@goldrate24.in
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex-shrink-0">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-2">Call Us</h3>
                                            <p className="text-sm text-text-secondary mb-2">
                                                Mon-Sat from 9am to 6pm IST
                                            </p>
                                            <a
                                                href="tel:+911234567890"
                                                className="text-primary hover:underline"
                                            >
                                                +91 123 456 7890
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-2">Visit Us</h3>
                                            <p className="text-sm text-text-secondary">
                                                123 Gold Street<br />
                                                Mumbai, Maharashtra 400001<br />
                                                India
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800">
                                    <div className="flex items-start gap-3">
                                        <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-200">
                                                Response Time
                                            </h4>
                                            <p className="text-xs text-amber-800 dark:text-amber-300">
                                                We typically respond to all inquiries within 24-48 hours during business days.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <div className="card p-6 md:p-8">
                                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                                    {submitted && (
                                        <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                                            <p className="text-green-800 dark:text-green-200 font-medium">
                                                ✓ Thank you! Your message has been sent successfully.
                                            </p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="input-group">
                                                <label htmlFor="name" className="input-label">
                                                    Your Name *
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="input"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>

                                            <div className="input-group">
                                                <label htmlFor="email" className="input-label">
                                                    Email Address *
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="input"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="input-group">
                                            <label htmlFor="subject" className="input-label">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="rates">Gold Rates Question</option>
                                                <option value="calculator">Calculator Support</option>
                                                <option value="technical">Technical Issue</option>
                                                <option value="partnership">Partnership Opportunity</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="input-group">
                                            <label htmlFor="message" className="input-label">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="input min-h-[150px] resize-y"
                                                placeholder="Tell us more about your inquiry..."
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn-primary w-full md:w-auto">
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            {[
                                {
                                    q: 'How often are gold rates updated?',
                                    a: 'Our gold rates are updated every hour to ensure you have the most current market information.',
                                },
                                {
                                    q: 'Are the calculator results accurate?',
                                    a: 'Our calculators provide estimates based on your inputs. For exact figures, please consult with your jeweler or financial advisor.',
                                },
                                {
                                    q: 'Do you provide investment advice?',
                                    a: 'No, we provide information and tools only. We recommend consulting with certified financial advisors for investment decisions.',
                                },
                                {
                                    q: 'How can I add my city to the list?',
                                    a: 'Please contact us with your city details, and we\'ll consider adding it to our coverage area.',
                                },
                            ].map((faq, index) => (
                                <div key={index} className="card p-6">
                                    <h3 className="font-bold mb-2">{faq.q}</h3>
                                    <p className="text-text-secondary text-sm">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
