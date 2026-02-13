'use client';

import { useState } from 'react';
import { BarChart3, RotateCcw } from 'lucide-react';

interface Props {
    bankName?: string;
}

export default function SIPCalculatorClient({ bankName }: Props) {
    const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
    const [expectedReturn, setExpectedReturn] = useState('12');
    const [timePeriod, setTimePeriod] = useState('10');
    const [stepUp, setStepUp] = useState('10');
    const [enableStepUp, setEnableStepUp] = useState(false);

    const calculate = () => {
        const P = parseFloat(monthlyInvestment) || 0;
        const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
        const n = (parseFloat(timePeriod) || 0) * 12;
        const stepUpRate = enableStepUp ? (parseFloat(stepUp) || 0) / 100 : 0;

        if (r === 0 || n === 0) return { invested: 0, returns: 0, total: 0 };

        let totalInvested = 0;
        let totalValue = 0;
        let currentMonthly = P;

        for (let month = 1; month <= n; month++) {
            if (stepUpRate > 0 && month > 1 && (month - 1) % 12 === 0) {
                currentMonthly = currentMonthly * (1 + stepUpRate);
            }
            totalInvested += currentMonthly;
            totalValue = (totalValue + currentMonthly) * (1 + r);
        }

        return {
            invested: Math.round(totalInvested),
            returns: Math.round(totalValue - totalInvested),
            total: Math.round(totalValue),
        };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');
    const displayName = bankName ? `${bankName} SIP` : 'SIP';

    const handleReset = () => {
        setMonthlyInvestment('5000'); setExpectedReturn('12');
        setTimePeriod('10'); setStepUp('10'); setEnableStepUp(false);
    };

    const investedPercent = result.total > 0 ? (result.invested / result.total) * 100 : 50;

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-100 to-purple-100 dark:from-fuchsia-900/30 dark:to-purple-900/30 border border-fuchsia-300 dark:border-fuchsia-700 mb-6">
                            <BarChart3 className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                            <span className="text-sm font-semibold text-fuchsia-800 dark:text-fuchsia-200">{displayName} Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-fuchsia-400 dark:to-purple-400 bg-clip-text text-transparent">{displayName}</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Plan your systematic investment and visualize wealth growth</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Investment Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="monthly" className="input-label">Monthly Investment (₹)</label>
                                        <input id="monthly" type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} className="input" min="500" step="500" />
                                        <div className="flex gap-2 mt-2">
                                            {[1000, 5000, 10000, 25000, 50000].map((a) => (
                                                <button key={a} onClick={() => setMonthlyInvestment(a.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">₹{(a / 1000)}K</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="return" className="input-label">Expected Return Rate (% p.a.)</label>
                                        <input id="return" type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="input" min="1" max="30" step="0.5" />
                                        <div className="flex gap-2 mt-2">
                                            {[8, 10, 12, 15].map((r) => (
                                                <button key={r} onClick={() => setExpectedReturn(r.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{r}%</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="period" className="input-label">Time Period (Years)</label>
                                        <input id="period" type="number" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="input" min="1" max="40" step="1" />
                                        <div className="flex gap-2 mt-2">
                                            {[5, 10, 15, 20, 25].map((y) => (
                                                <button key={y} onClick={() => setTimePeriod(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <div className="flex items-center justify-between mb-2">
                                            <label htmlFor="stepup" className="input-label mb-0">Annual Step-Up (%)</label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={enableStepUp} onChange={(e) => setEnableStepUp(e.target.checked)} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                                                <span className="text-sm text-text-secondary">Enable</span>
                                            </label>
                                        </div>
                                        <input id="stepup" type="number" value={stepUp} onChange={(e) => setStepUp(e.target.value)} className="input" min="0" max="50" step="1" disabled={!enableStepUp} />
                                        <p className="text-xs text-text-tertiary mt-1">Increase your SIP by this % every year</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-fuchsia-50 to-purple-50 dark:from-fuchsia-950/20 dark:to-purple-950/20 border-fuchsia-200 dark:border-fuchsia-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Total Value</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-fuchsia-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">₹{fmt(result.total)}</div>
                                    {/* Visual bar */}
                                    <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-3">
                                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${investedPercent}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-text-tertiary">
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Invested</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-fuchsia-500" /> Returns</span>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Investment Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Invested</span>
                                            <span className="font-semibold text-blue-600 dark:text-blue-400">₹{fmt(result.invested)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Est. Returns</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.returns)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Total Value</span>
                                            <span className="text-xl font-bold">₹{fmt(result.total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                                    <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-200">💡 Pro Tip</h4>
                                    <p className="text-xs text-blue-800 dark:text-blue-300">Enable Step-Up SIP to increase your investment annually and significantly boost your final corpus. Even a 10% annual step-up can double your returns over 20 years.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
