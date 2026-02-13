'use client';

import { useState } from 'react';
import { Building2, RotateCcw } from 'lucide-react';

export default function HRACalculatorClient() {
    const [basicSalary, setBasicSalary] = useState('50000');
    const [hraReceived, setHraReceived] = useState('20000');
    const [rentPaid, setRentPaid] = useState('15000');
    const [isMetro, setIsMetro] = useState(true);

    const calculate = () => {
        const basic = parseFloat(basicSalary) || 0;
        const hra = parseFloat(hraReceived) || 0;
        const rent = parseFloat(rentPaid) || 0;

        if (basic <= 0 || hra <= 0 || rent <= 0) return { exemption: 0, taxable: 0, annual: { exemption: 0, taxable: 0 }, breakdown: { actualHRA: 0, rentMinus10: 0, percentBasic: 0 } };

        const actualHRA = hra;
        const rentMinus10 = rent - (basic * 0.10);
        const percentBasic = isMetro ? basic * 0.50 : basic * 0.40;

        const exemption = Math.max(0, Math.min(actualHRA, Math.max(0, rentMinus10), percentBasic));
        const taxable = hra - exemption;

        return {
            exemption,
            taxable,
            annual: { exemption: exemption * 12, taxable: taxable * 12 },
            breakdown: { actualHRA, rentMinus10: Math.max(0, rentMinus10), percentBasic },
        };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

    const handleReset = () => { setBasicSalary('50000'); setHraReceived('20000'); setRentPaid('15000'); setIsMetro(true); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 border border-indigo-300 dark:border-indigo-700 mb-6">
                            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">HRA Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">HRA</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate your House Rent Allowance tax exemption</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Salary Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="basic" className="input-label">Basic Salary (Monthly) (₹)</label>
                                        <input id="basic" type="number" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} className="input" min="0" step="1000" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="hra" className="input-label">HRA Received (Monthly) (₹)</label>
                                        <input id="hra" type="number" value={hraReceived} onChange={(e) => setHraReceived(e.target.value)} className="input" min="0" step="1000" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="rent" className="input-label">Rent Paid (Monthly) (₹)</label>
                                        <input id="rent" type="number" value={rentPaid} onChange={(e) => setRentPaid(e.target.value)} className="input" min="0" step="1000" />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">City Type</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => setIsMetro(true)} className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${isMetro ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>Metro (50%)</button>
                                            <button onClick={() => setIsMetro(false)} className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${!isMetro ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>Non-Metro (40%)</button>
                                        </div>
                                        <p className="text-xs text-text-tertiary mt-1">Metro: Delhi, Mumbai, Kolkata, Chennai</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border-indigo-200 dark:border-indigo-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Monthly HRA Exemption</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">₹{fmt(result.exemption)}</div>
                                    <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-2">Annual Exemption: ₹{fmt(result.annual.exemption)}</p>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Exemption Breakdown</h3>
                                    <p className="text-xs text-text-tertiary mb-3">Exemption = Minimum of</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Actual HRA Received</span>
                                            <span className={`font-semibold ${result.exemption === result.breakdown.actualHRA ? 'text-green-600 dark:text-green-400' : ''}`}>₹{fmt(result.breakdown.actualHRA)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Rent - 10% of Basic</span>
                                            <span className={`font-semibold ${result.exemption === result.breakdown.rentMinus10 ? 'text-green-600 dark:text-green-400' : ''}`}>₹{fmt(result.breakdown.rentMinus10)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">{isMetro ? '50%' : '40%'} of Basic</span>
                                            <span className={`font-semibold ${result.exemption === result.breakdown.percentBasic ? 'text-green-600 dark:text-green-400' : ''}`}>₹{fmt(result.breakdown.percentBasic)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Taxable HRA (Monthly)</span>
                                            <span className="text-xl font-bold text-error">₹{fmt(result.taxable)}</span>
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
