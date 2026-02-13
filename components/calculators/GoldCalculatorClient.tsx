'use client';

import { useState } from 'react';
import { Calculator, RotateCcw, Download, Share2 } from 'lucide-react';

export default function GoldCalculatorClient() {
    const [weight, setWeight] = useState('10');
    const [purity, setPurity] = useState('22');
    const [rate, setRate] = useState('6520');
    const [makingCharges, setMakingCharges] = useState('10');
    const [makingChargesType, setMakingChargesType] = useState<'percentage' | 'fixed'>('percentage');
    const [gst, setGst] = useState('3');
    const [discount, setDiscount] = useState('0');

    const calculateTotal = () => {
        const w = parseFloat(weight) || 0;
        const r = parseFloat(rate) || 0;
        const mc = parseFloat(makingCharges) || 0;
        const g = parseFloat(gst) || 0;
        const d = parseFloat(discount) || 0;

        const goldValue = w * r;
        const makingChargesAmount = makingChargesType === 'percentage'
            ? (goldValue * mc) / 100
            : mc;
        const subtotal = goldValue + makingChargesAmount;
        const discountAmount = (subtotal * d) / 100;
        const afterDiscount = subtotal - discountAmount;
        const gstAmount = (afterDiscount * g) / 100;
        const total = afterDiscount + gstAmount;

        return {
            goldValue,
            makingChargesAmount,
            subtotal,
            discountAmount,
            afterDiscount,
            gstAmount,
            total,
            pricePerGram: w > 0 ? total / w : 0,
        };
    };

    const result = calculateTotal();

    const handleReset = () => {
        setWeight('10');
        setPurity('22');
        setRate('6520');
        setMakingCharges('10');
        setMakingChargesType('percentage');
        setGst('3');
        setDiscount('0');
    };

    const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 mb-6">
                            <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                                Advanced Gold Calculator
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gradient-gold">Gold Purchase</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">
                            Calculate the exact cost of your gold purchase with detailed breakdown
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Inputs */}
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Enter Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4">
                                        <RotateCcw className="w-4 h-4" /> Reset
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="weight" className="input-label">Weight (grams)</label>
                                        <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input" placeholder="Enter weight" min="0" step="0.001" />
                                        <div className="flex gap-2 mt-2">
                                            {[1, 5, 10, 50, 100].map((w) => (
                                                <button key={w} onClick={() => setWeight(w.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{w}g</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="purity" className="input-label">Gold Purity</label>
                                        <select id="purity" value={purity} onChange={(e) => setPurity(e.target.value)} className="input">
                                            <option value="24">24K (99.9% pure)</option>
                                            <option value="22">22K (91.6% pure)</option>
                                            <option value="18">18K (75% pure)</option>
                                            <option value="14">14K (58.5% pure)</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="rate" className="input-label">Gold Rate (₹ per gram)</label>
                                        <input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="input" placeholder="Enter rate per gram" min="0" step="1" />
                                        <p className="text-xs text-text-tertiary mt-1">Current {purity}K gold rate</p>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="makingCharges" className="input-label">Making Charges</label>
                                        <div className="flex gap-2">
                                            <input id="makingCharges" type="number" value={makingCharges} onChange={(e) => setMakingCharges(e.target.value)} className="input flex-1" placeholder="Enter making charges" min="0" step="0.1" />
                                            <select value={makingChargesType} onChange={(e) => setMakingChargesType(e.target.value as 'percentage' | 'fixed')} className="input w-32">
                                                <option value="percentage">%</option>
                                                <option value="fixed">₹</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="discount" className="input-label">Discount (%)</label>
                                        <input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="input" placeholder="Enter discount percentage" min="0" max="100" step="0.1" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="gst" className="input-label">GST (%)</label>
                                        <input id="gst" type="number" value={gst} onChange={(e) => setGst(e.target.value)} className="input" placeholder="Enter GST percentage" min="0" step="0.1" />
                                        <p className="text-xs text-text-tertiary mt-1">Standard GST on gold is 3%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="card-gold p-6">
                                    <h3 className="text-xl font-bold mb-6">Calculation Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-text-secondary">Gold Value</span>
                                            <span className="font-semibold">₹{fmt(result.goldValue)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-text-secondary">Making Charges</span>
                                            <span className="font-semibold">₹{fmt(result.makingChargesAmount)}</span>
                                        </div>
                                        {parseFloat(discount) > 0 && (
                                            <div className="flex justify-between items-center pb-3 border-b border-amber-200 dark:border-amber-800">
                                                <span className="text-sm text-text-secondary">Discount</span>
                                                <span className="font-semibold text-success">-₹{fmt(result.discountAmount)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pb-3 border-b border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-text-secondary">GST ({gst}%)</span>
                                            <span className="font-semibold">₹{fmt(result.gstAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="text-lg font-bold">Total Amount</span>
                                            <span className="text-2xl font-bold text-gradient-gold">₹{fmt(result.total)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm pt-2 border-t border-amber-200 dark:border-amber-800">
                                            <span className="text-text-tertiary">Price per gram</span>
                                            <span className="font-medium">₹{fmt(result.pricePerGram)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="btn-secondary flex-1 text-sm"><Share2 className="w-4 h-4" /> Share</button>
                                    <button className="btn-secondary flex-1 text-sm"><Download className="w-4 h-4" /> Download</button>
                                </div>
                                <div className="card p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                                    <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-200">💡 Did you know?</h4>
                                    <p className="text-xs text-blue-800 dark:text-blue-300">Making charges typically range from 6% to 25% depending on the design complexity. Always ask for a detailed invoice showing all charges separately.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
