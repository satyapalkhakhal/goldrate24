'use client';

import { useState } from 'react';
import { Landmark, RotateCcw } from 'lucide-react';

export default function NPSCalculatorClient() {
    const [monthlyContribution, setMonthlyContribution] = useState('5000');
    const [currentAge, setCurrentAge] = useState('25');
    const [expectedReturn, setExpectedReturn] = useState('10');
    const [annuityPercentage, setAnnuityPercentage] = useState('40');
    const [annuityReturn, setAnnuityReturn] = useState('6');
    const retirementAge = 60;

    const calculate = () => {
        const monthly = parseFloat(monthlyContribution) || 0;
        const age = parseInt(currentAge) || 25;
        const returnRate = parseFloat(expectedReturn) / 100 / 12 || 0;
        const annuityPct = parseFloat(annuityPercentage) / 100 || 0.4;
        const annuityRet = parseFloat(annuityReturn) / 100 / 12 || 0;

        const yearsToRetire = Math.max(0, retirementAge - age);
        const months = yearsToRetire * 12;

        if (monthly <= 0 || months <= 0 || returnRate <= 0) return { totalCorpus: 0, totalInvested: 0, totalReturns: 0, lumpsum: 0, annuityCorpus: 0, monthlyPension: 0 };

        const totalCorpus = monthly * ((Math.pow(1 + returnRate, months) - 1) / returnRate) * (1 + returnRate);
        const totalInvested = monthly * months;
        const totalReturns = totalCorpus - totalInvested;

        const lumpsum = totalCorpus * (1 - annuityPct);
        const annuityCorpus = totalCorpus * annuityPct;
        const monthlyPension = annuityRet > 0 ? (annuityCorpus * annuityRet) / (1 - Math.pow(1 + annuityRet, -240)) : annuityCorpus / 240;

        return {
            totalCorpus: Math.round(totalCorpus),
            totalInvested: Math.round(totalInvested),
            totalReturns: Math.round(totalReturns),
            lumpsum: Math.round(lumpsum),
            annuityCorpus: Math.round(annuityCorpus),
            monthlyPension: Math.round(monthlyPension),
        };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');

    const handleReset = () => {
        setMonthlyContribution('5000'); setCurrentAge('25'); setExpectedReturn('10');
        setAnnuityPercentage('40'); setAnnuityReturn('6');
    };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 border border-pink-300 dark:border-pink-700 mb-6">
                            <Landmark className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                            <span className="text-sm font-semibold text-pink-800 dark:text-pink-200">NPS Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">NPS</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Plan your retirement with National Pension System projections</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">NPS Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="monthly" className="input-label">Monthly Contribution (₹)</label>
                                        <input id="monthly" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="input" min="500" step="500" />
                                        <div className="flex gap-2 mt-2">
                                            {[2000, 5000, 10000, 25000].map((a) => (
                                                <button key={a} onClick={() => setMonthlyContribution(a.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">₹{a >= 1000 ? `${a / 1000}K` : a}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="input-group">
                                            <label htmlFor="age" className="input-label">Current Age</label>
                                            <input id="age" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="input" min="18" max="59" step="1" />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="return" className="input-label">Expected Return (%)</label>
                                            <input id="return" type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="input" min="4" max="20" step="0.5" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="input-group">
                                            <label htmlFor="annuity" className="input-label">Annuity Purchase (%)</label>
                                            <input id="annuity" type="number" value={annuityPercentage} onChange={(e) => setAnnuityPercentage(e.target.value)} className="input" min="40" max="100" step="5" />
                                            <p className="text-xs text-text-tertiary mt-1">Minimum 40%</p>
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="annuityReturn" className="input-label">Annuity Return (%)</label>
                                            <input id="annuityReturn" type="number" value={annuityReturn} onChange={(e) => setAnnuityReturn(e.target.value)} className="input" min="4" max="10" step="0.5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200 dark:border-pink-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Total Retirement Corpus</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">₹{fmt(result.totalCorpus)}</div>
                                    <p className="text-xs text-text-tertiary mt-2">At age {retirementAge} ({retirementAge - (parseInt(currentAge) || 25)} years from now)</p>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Retirement Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Invested</span>
                                            <span className="font-semibold">₹{fmt(result.totalInvested)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Returns</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.totalReturns)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Lumpsum (Tax-Free)</span>
                                            <span className="font-semibold">₹{fmt(result.lumpsum)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Annuity Corpus</span>
                                            <span className="font-semibold">₹{fmt(result.annuityCorpus)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Est. Monthly Pension</span>
                                            <span className="text-xl font-bold text-green-600 dark:text-green-400">₹{fmt(result.monthlyPension)}</span>
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
