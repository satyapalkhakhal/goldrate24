'use client';

import { useState } from 'react';
import { UserCircle, RotateCcw } from 'lucide-react';

export default function PersonalLoanCalculatorClient() {
    const [loanAmount, setLoanAmount] = useState('500000');
    const [interestRate, setInterestRate] = useState('12');
    const [tenure, setTenure] = useState('3');

    const calculate = () => {
        const P = parseFloat(loanAmount) || 0;
        const annualRate = parseFloat(interestRate) || 0;
        const years = parseFloat(tenure) || 0;
        if (P <= 0 || annualRate <= 0 || years <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };
        const r = annualRate / 100 / 12;
        const n = years * 12;
        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        return { emi: Math.round(emi), totalInterest: Math.round(totalPayment - P), totalPayment: Math.round(totalPayment) };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');
    const handleReset = () => { setLoanAmount('500000'); setInterestRate('12'); setTenure('3'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom"><div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 border border-teal-300 dark:border-teal-700 mb-6">
                        <UserCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-sm font-semibold text-teal-800 dark:text-teal-200">Personal Loan Calculator</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">Personal Loan</span> Calculator</h1>
                    <p className="text-lg text-text-secondary">Calculate EMI for your personal loan</p>
                </div></div>
            </section>
            <section className="section"><div className="container-custom"><div className="max-w-6xl mx-auto"><div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 card p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Loan Details</h2>
                        <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                    </div>
                    <div className="space-y-6">
                        <div className="input-group">
                            <label htmlFor="loan" className="input-label">Loan Amount (₹)</label>
                            <input id="loan" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="input" min="10000" step="50000" />
                            <div className="flex gap-2 mt-2">{[100000, 300000, 500000, 1000000].map((a) => (<button key={a} onClick={() => setLoanAmount(a.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">₹{a >= 100000 ? `${a / 100000}L` : `${a / 1000}K`}</button>))}</div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="rate" className="input-label">Interest Rate (% p.a.)</label>
                            <input id="rate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input" min="8" max="30" step="0.5" />
                            <div className="flex gap-2 mt-2">{[10, 12, 14, 16].map((r) => (<button key={r} onClick={() => setInterestRate(r.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{r}%</button>))}</div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="tenure" className="input-label">Loan Tenure (Years)</label>
                            <input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="input" min="1" max="5" step="0.5" />
                            <div className="flex gap-2 mt-2">{[1, 2, 3, 4, 5].map((y) => (<button key={y} onClick={() => setTenure(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>))}</div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border-teal-200 dark:border-teal-800">
                        <h3 className="font-bold mb-2 text-sm text-text-secondary">Monthly EMI</h3>
                        <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">₹{fmt(result.emi)}</div>
                    </div>
                    <div className="card p-6">
                        <h3 className="font-bold mb-4">Loan Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-border"><span className="text-sm text-text-secondary">Loan Amount</span><span className="font-semibold">₹{fmt(parseFloat(loanAmount) || 0)}</span></div>
                            <div className="flex justify-between items-center pb-3 border-b border-border"><span className="text-sm text-text-secondary">Total Interest</span><span className="font-semibold text-error">₹{fmt(result.totalInterest)}</span></div>
                            <div className="flex justify-between items-center pt-2"><span className="font-bold">Total Payment</span><span className="text-xl font-bold">₹{fmt(result.totalPayment)}</span></div>
                        </div>
                    </div>
                </div>
            </div></div></div></section>
        </div>
    );
}
