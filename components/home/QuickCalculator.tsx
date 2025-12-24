'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

export default function QuickCalculator() {
    const [weight, setWeight] = useState('10');
    const [rate, setRate] = useState('6500');
    const [makingCharges, setMakingCharges] = useState('10');
    const [gst, setGst] = useState('3');

    const calculateTotal = () => {
        const w = parseFloat(weight) || 0;
        const r = parseFloat(rate) || 0;
        const mc = parseFloat(makingCharges) || 0;
        const g = parseFloat(gst) || 0;

        const goldValue = w * r;
        const makingChargesAmount = (goldValue * mc) / 100;
        const subtotal = goldValue + makingChargesAmount;
        const gstAmount = (subtotal * g) / 100;
        const total = subtotal + gstAmount;

        return {
            goldValue,
            makingChargesAmount,
            gstAmount,
            total,
        };
    };

    const result = calculateTotal();

    return (
        <section className="section">
            <div className="container-custom">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="section-title">Quick Gold Calculator</h2>
                        <p className="section-subtitle">
                            Calculate the total cost of your gold purchase including making charges and GST
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Calculator Form */}
                        <div className="card p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600">
                                    <Calculator className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">Enter Details</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Weight Input */}
                                <div className="input-group">
                                    <label htmlFor="weight" className="input-label">
                                        Weight (grams)
                                    </label>
                                    <input
                                        id="weight"
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="input"
                                        placeholder="Enter weight in grams"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>

                                {/* Rate Input */}
                                <div className="input-group">
                                    <label htmlFor="rate" className="input-label">
                                        Gold Rate (₹ per gram)
                                    </label>
                                    <input
                                        id="rate"
                                        type="number"
                                        value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                        className="input"
                                        placeholder="Enter rate per gram"
                                        min="0"
                                        step="1"
                                    />
                                </div>

                                {/* Making Charges Input */}
                                <div className="input-group">
                                    <label htmlFor="makingCharges" className="input-label">
                                        Making Charges (%)
                                    </label>
                                    <input
                                        id="makingCharges"
                                        type="number"
                                        value={makingCharges}
                                        onChange={(e) => setMakingCharges(e.target.value)}
                                        className="input"
                                        placeholder="Enter making charges percentage"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>

                                {/* GST Input */}
                                <div className="input-group">
                                    <label htmlFor="gst" className="input-label">
                                        GST (%)
                                    </label>
                                    <input
                                        id="gst"
                                        type="number"
                                        value={gst}
                                        onChange={(e) => setGst(e.target.value)}
                                        className="input"
                                        placeholder="Enter GST percentage"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="card-gold p-6 md:p-8">
                            <h3 className="text-xl font-bold mb-6">Calculation Summary</h3>

                            <div className="space-y-4">
                                {/* Gold Value */}
                                <div className="flex justify-between items-center pb-3 border-b border-amber-200 dark:border-amber-800">
                                    <span className="text-text-secondary">Gold Value</span>
                                    <span className="font-semibold">
                                        ₹{result.goldValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                    </span>
                                </div>

                                {/* Making Charges */}
                                <div className="flex justify-between items-center pb-3 border-b border-amber-200 dark:border-amber-800">
                                    <span className="text-text-secondary">Making Charges</span>
                                    <span className="font-semibold">
                                        ₹{result.makingChargesAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                    </span>
                                </div>

                                {/* GST */}
                                <div className="flex justify-between items-center pb-3 border-b border-amber-200 dark:border-amber-800">
                                    <span className="text-text-secondary">GST</span>
                                    <span className="font-semibold">
                                        ₹{result.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                    </span>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-2xl font-bold text-gradient-gold">
                                        ₹{result.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            {/* CTA */}
                            <Link href="/calculators/gold" className="btn-primary w-full mt-8 group">
                                Advanced Calculator
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
