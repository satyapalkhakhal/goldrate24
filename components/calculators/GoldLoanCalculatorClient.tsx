'use client';

import { useState } from 'react';
import { TrendingUp, RotateCcw, Download, Info } from 'lucide-react';

export default function GoldLoanCalculatorClient() {
    const [goldWeight, setGoldWeight] = useState('50');
    const [purity, setPurity] = useState('22');
    const [goldRate, setGoldRate] = useState('6520');
    const [ltvRatio, setLtvRatio] = useState('75');
    const [interestRate, setInterestRate] = useState('12');
    const [tenure, setTenure] = useState('12');

    const calculateLoan = () => {
        const weight = parseFloat(goldWeight) || 0;
        const rate = parseFloat(goldRate) || 0;
        const ltv = parseFloat(ltvRatio) || 0;
        const interest = parseFloat(interestRate) || 0;
        const months = parseFloat(tenure) || 0;

        const goldValue = weight * rate;
        const maxLoanAmount = (goldValue * ltv) / 100;
        const monthlyInterest = (maxLoanAmount * interest) / 100 / 12;
        const totalInterest = monthlyInterest * months;
        const totalRepayment = maxLoanAmount + totalInterest;
        const monthlyPayment = months > 0 ? totalRepayment / months : 0;

        return { goldValue, maxLoanAmount, monthlyInterest, totalInterest, totalRepayment, monthlyPayment };
    };

    const result = calculateLoan();
    const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

    const handleReset = () => {
        setGoldWeight('50'); setPurity('22'); setGoldRate('6520');
        setLtvRatio('75'); setInterestRate('12'); setTenure('12');
    };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-300 dark:border-green-700 mb-6">
                            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-semibold text-green-800 dark:text-green-200">Gold Loan Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">Gold Loan</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate loan amount, interest, and repayment based on your gold</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Gold Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="goldWeight" className="input-label">Gold Weight (grams)</label>
                                        <input id="goldWeight" type="number" value={goldWeight} onChange={(e) => setGoldWeight(e.target.value)} className="input" min="0" step="0.1" />
                                        <div className="flex gap-2 mt-2">
                                            {[25, 50, 100, 200].map((w) => (
                                                <button key={w} onClick={() => setGoldWeight(w.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{w}g</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="purity" className="input-label">Gold Purity</label>
                                        <select id="purity" value={purity} onChange={(e) => setPurity(e.target.value)} className="input">
                                            <option value="24">24K (99.9% pure)</option>
                                            <option value="22">22K (91.6% pure)</option>
                                            <option value="18">18K (75% pure)</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="goldRate" className="input-label">Current Gold Rate (₹ per gram)</label>
                                        <input id="goldRate" type="number" value={goldRate} onChange={(e) => setGoldRate(e.target.value)} className="input" min="0" step="1" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="ltvRatio" className="input-label">LTV Ratio (%)</label>
                                        <input id="ltvRatio" type="number" value={ltvRatio} onChange={(e) => setLtvRatio(e.target.value)} className="input" min="0" max="90" step="1" />
                                        <p className="text-xs text-text-tertiary mt-1">Loan-to-Value ratio (typically 65-75%)</p>
                                        <div className="flex gap-2 mt-2">
                                            {[65, 70, 75, 80].map((ltv) => (
                                                <button key={ltv} onClick={() => setLtvRatio(ltv.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{ltv}%</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="interestRate" className="input-label">Interest Rate (% per annum)</label>
                                        <input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input" min="0" max="30" step="0.1" />
                                        <div className="flex gap-2 mt-2">
                                            {[10, 12, 14].map((r) => (
                                                <button key={r} onClick={() => setInterestRate(r.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{r}%</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="tenure" className="input-label">Loan Tenure (months)</label>
                                        <input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="input" min="1" max="36" step="1" />
                                        <div className="flex gap-2 mt-2">
                                            {[6, 12, 18, 24].map((m) => (
                                                <button key={m} onClick={() => setTenure(m.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{m}M</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                                            <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-text-secondary">Maximum Loan Amount</div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">₹{fmt(result.maxLoanAmount)}</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-tertiary">Based on {ltvRatio}% LTV of gold value</p>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Loan Summary</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Gold Value', value: `₹${fmt(result.goldValue)}` },
                                            { label: 'Loan Amount', value: `₹${fmt(result.maxLoanAmount)}` },
                                            { label: 'Total Interest', value: `₹${fmt(result.totalInterest)}`, className: 'text-error' },
                                            { label: 'Monthly Payment', value: `₹${fmt(result.monthlyPayment)}` },
                                        ].map((item) => (
                                            <div key={item.label} className="flex justify-between items-center pb-3 border-b border-border">
                                                <span className="text-sm text-text-secondary">{item.label}</span>
                                                <span className={`font-semibold ${item.className || ''}`}>{item.value}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Total Repayment</span>
                                            <span className="text-xl font-bold">₹{fmt(result.totalRepayment)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn-primary w-full"><Download className="w-5 h-5" /> Download Loan Details</button>

                                <div className="card p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                                    <div className="flex gap-2 mb-2">
                                        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-200">About LTV Ratio</h4>
                                            <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">Loan-to-Value (LTV) is the percentage of gold value you can borrow. Most lenders offer 65-75% LTV for gold loans.</p>
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
