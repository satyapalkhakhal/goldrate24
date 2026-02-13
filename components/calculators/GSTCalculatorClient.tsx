'use client';

import { useState } from 'react';
import { Receipt, RotateCcw } from 'lucide-react';

export default function GSTCalculatorClient() {
    const [amount, setAmount] = useState('10000');
    const [gstRate, setGstRate] = useState('18');
    const [calcType, setCalcType] = useState<'addGst' | 'removeGst'>('addGst');
    const [gstType, setGstType] = useState<'intra' | 'inter'>('intra');

    const calculate = () => {
        const amt = parseFloat(amount) || 0;
        const rate = parseFloat(gstRate) || 0;

        if (amt <= 0 || rate <= 0) return { originalAmount: 0, gstAmount: 0, totalAmount: 0, cgst: 0, sgst: 0, igst: 0 };

        let originalAmount: number, gstAmount: number, totalAmount: number;

        if (calcType === 'addGst') {
            originalAmount = amt;
            gstAmount = (amt * rate) / 100;
            totalAmount = amt + gstAmount;
        } else {
            totalAmount = amt;
            originalAmount = (amt * 100) / (100 + rate);
            gstAmount = totalAmount - originalAmount;
        }

        const cgst = gstType === 'intra' ? gstAmount / 2 : 0;
        const sgst = gstType === 'intra' ? gstAmount / 2 : 0;
        const igst = gstType === 'inter' ? gstAmount : 0;

        return { originalAmount, gstAmount, totalAmount, cgst, sgst, igst };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

    const handleReset = () => { setAmount('10000'); setGstRate('18'); setCalcType('addGst'); setGstType('intra'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-300 dark:border-orange-700 mb-6">
                            <Receipt className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <span className="text-sm font-semibold text-orange-800 dark:text-orange-200">GST Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">GST</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate GST with CGST, SGST, and IGST breakdown</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">GST Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label className="input-label">Calculation Type</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => setCalcType('addGst')} className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${calcType === 'addGst' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>Add GST</button>
                                            <button onClick={() => setCalcType('removeGst')} className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${calcType === 'removeGst' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>Remove GST</button>
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="amount" className="input-label">{calcType === 'addGst' ? 'Original Amount (₹)' : 'GST-inclusive Amount (₹)'}</label>
                                        <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input" min="0" step="100" />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">GST Rate</label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {['0', '5', '12', '18', '28'].map((r) => (
                                                <button key={r} onClick={() => setGstRate(r)} className={`py-3 rounded-xl text-sm font-semibold border transition-all ${gstRate === r ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>{r}%</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Transaction Type</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => setGstType('intra')} className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${gstType === 'intra' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>Intra-State (CGST + SGST)</button>
                                            <button onClick={() => setGstType('inter')} className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${gstType === 'inter' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>Inter-State (IGST)</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Total Amount</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">₹{fmt(result.totalAmount)}</div>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">GST Breakdown</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Original Amount</span>
                                            <span className="font-semibold">₹{fmt(result.originalAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">GST Amount ({gstRate}%)</span>
                                            <span className="font-semibold text-error">₹{fmt(result.gstAmount)}</span>
                                        </div>
                                        {gstType === 'intra' ? (
                                            <>
                                                <div className="flex justify-between items-center pb-3 border-b border-border">
                                                    <span className="text-sm text-text-secondary">CGST ({parseFloat(gstRate) / 2}%)</span>
                                                    <span className="font-semibold">₹{fmt(result.cgst)}</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-3 border-b border-border">
                                                    <span className="text-sm text-text-secondary">SGST ({parseFloat(gstRate) / 2}%)</span>
                                                    <span className="font-semibold">₹{fmt(result.sgst)}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex justify-between items-center pb-3 border-b border-border">
                                                <span className="text-sm text-text-secondary">IGST ({gstRate}%)</span>
                                                <span className="font-semibold">₹{fmt(result.igst)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Total</span>
                                            <span className="text-xl font-bold">₹{fmt(result.totalAmount)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
