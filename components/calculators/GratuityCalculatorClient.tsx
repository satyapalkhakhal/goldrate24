'use client';

import { useState } from 'react';
import { HandCoins, RotateCcw } from 'lucide-react';

export default function GratuityCalculatorClient() {
    const [lastSalary, setLastSalary] = useState('50000');
    const [yearsOfService, setYearsOfService] = useState('10');
    const [employeeType, setEmployeeType] = useState<'covered' | 'notCovered'>('covered');

    const calculate = () => {
        const salary = parseFloat(lastSalary) || 0;
        const years = parseFloat(yearsOfService) || 0;

        if (salary <= 0 || years < 5) return { gratuity: 0, taxFree: 0, taxable: 0 };

        // Gratuity Act covered: (Basic + DA) × 15/26 × Years
        // Not covered: (Basic + DA) × 15/30 × Years
        const gratuity = employeeType === 'covered'
            ? (salary * 15 * years) / 26
            : (salary * 15 * years) / 30;

        const taxFreeLimit = 2000000; // ₹20 lakh
        const taxFree = Math.min(gratuity, taxFreeLimit);
        const taxable = Math.max(0, gratuity - taxFreeLimit);

        return { gratuity: Math.round(gratuity), taxFree: Math.round(taxFree), taxable: Math.round(taxable) };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');
    const years = parseFloat(yearsOfService) || 0;

    const handleReset = () => { setLastSalary('50000'); setYearsOfService('10'); setEmployeeType('covered'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 border border-rose-300 dark:border-rose-700 mb-6">
                            <HandCoins className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                            <span className="text-sm font-semibold text-rose-800 dark:text-rose-200">Gratuity Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">Gratuity</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate your gratuity as per Payment of Gratuity Act, 1972</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Employment Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="salary" className="input-label">Last Drawn Salary (Basic + DA) (₹)</label>
                                        <input id="salary" type="number" value={lastSalary} onChange={(e) => setLastSalary(e.target.value)} className="input" min="0" step="1000" />
                                        <div className="flex gap-2 mt-2">
                                            {[25000, 50000, 75000, 100000].map((s) => (
                                                <button key={s} onClick={() => setLastSalary(s.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">₹{s / 1000}K</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="years" className="input-label">Years of Service</label>
                                        <input id="years" type="number" value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} className="input" min="0" max="50" step="1" />
                                        <div className="flex gap-2 mt-2">
                                            {[5, 10, 15, 20, 25].map((y) => (
                                                <button key={y} onClick={() => setYearsOfService(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>
                                            ))}
                                        </div>
                                        {years > 0 && years < 5 && (
                                            <p className="text-xs text-error mt-1">Minimum 5 years of continuous service required for gratuity</p>
                                        )}
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Coverage Type</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="type" checked={employeeType === 'covered'} onChange={() => setEmployeeType('covered')} className="w-4 h-4 text-primary" />
                                                <span className="text-sm">Covered (÷ 26 days)</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="type" checked={employeeType === 'notCovered'} onChange={() => setEmployeeType('notCovered')} className="w-4 h-4 text-primary" />
                                                <span className="text-sm">Not Covered (÷ 30 days)</span>
                                            </label>
                                        </div>
                                        <p className="text-xs text-text-tertiary mt-1">Employees covered under Payment of Gratuity Act use 26 working days</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border-rose-200 dark:border-rose-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Gratuity Amount</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">₹{fmt(result.gratuity)}</div>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Tax Breakdown</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Tax-Free Amount</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.taxFree)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Taxable Amount</span>
                                            <span className="font-semibold text-error">₹{fmt(result.taxable)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Total Gratuity</span>
                                            <span className="text-xl font-bold">₹{fmt(result.gratuity)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                                    <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-200">💡 Note</h4>
                                    <p className="text-xs text-blue-800 dark:text-blue-300">Gratuity is tax-free up to ₹20 lakhs. Any amount above this limit is taxable as per your income tax slab.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
