'use client';

import { useState } from 'react';
import { Home, RotateCcw } from 'lucide-react';

interface Props {
    bankName?: string;
    defaultInterestRate?: number;
}

export default function HomeLoanCalculatorClient({ bankName, defaultInterestRate }: Props) {
    const [loanAmount, setLoanAmount] = useState('5000000');
    const [interestRate, setInterestRate] = useState(defaultInterestRate?.toString() || '8.5');
    const [tenure, setTenure] = useState('20');

    const calculate = () => {
        const P = parseFloat(loanAmount) || 0;
        const annualRate = parseFloat(interestRate) || 0;
        const r = annualRate / 100 / 12;
        const n = (parseFloat(tenure) || 0) * 12;

        if (r === 0 || n === 0 || P === 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };

        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        return { emi: Math.round(emi), totalInterest: Math.round(totalInterest), totalPayment: Math.round(totalPayment) };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');
    const displayName = bankName ? `${bankName} Home Loan` : 'Home Loan';
    const principalPercent = result.totalPayment > 0 ? ((parseFloat(loanAmount) || 0) / result.totalPayment) * 100 : 50;

    const handleReset = () => {
        setLoanAmount('5000000'); setInterestRate(defaultInterestRate?.toString() || '8.5'); setTenure('20');
    };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-300 dark:border-blue-700 mb-6">
                            <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">{displayName} Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">{displayName}</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate your home loan EMI, total interest, and repayment schedule</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Loan Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="amount" className="input-label">Loan Amount (₹)</label>
                                        <input id="amount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="input" min="0" step="100000" />
                                        <div className="flex gap-2 mt-2">
                                            {[2000000, 3500000, 5000000, 7500000, 10000000].map((a) => (
                                                <button key={a} onClick={() => setLoanAmount(a.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{a >= 10000000 ? `${a / 10000000}Cr` : `${a / 100000}L`}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="rate" className="input-label">Interest Rate (% p.a.)</label>
                                        <input id="rate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input" min="1" max="20" step="0.1" />
                                        <div className="flex gap-2 mt-2">
                                            {[7.5, 8.25, 8.5, 9.0, 9.5].map((r) => (
                                                <button key={r} onClick={() => setInterestRate(r.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{r}%</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="tenure" className="input-label">Loan Tenure (Years)</label>
                                        <input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="input" min="1" max="30" step="1" />
                                        <div className="flex gap-2 mt-2">
                                            {[10, 15, 20, 25, 30].map((y) => (
                                                <button key={y} onClick={() => setTenure(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Monthly EMI</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">₹{fmt(result.emi)}</div>
                                    <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-3">
                                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-500" style={{ width: `${principalPercent}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-text-tertiary">
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Principal</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Interest</span>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Payment Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Principal</span>
                                            <span className="font-semibold">₹{fmt(parseFloat(loanAmount) || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Interest</span>
                                            <span className="font-semibold text-error">₹{fmt(result.totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Total Payment</span>
                                            <span className="text-xl font-bold">₹{fmt(result.totalPayment)}</span>
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
