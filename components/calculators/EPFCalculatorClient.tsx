'use client';

import { useState } from 'react';
import { ShieldCheck, RotateCcw } from 'lucide-react';

export default function EPFCalculatorClient() {
    const [basicSalary, setBasicSalary] = useState('25000');
    const [dearnessAllowance, setDearnessAllowance] = useState('5000');
    const [employeeAge, setEmployeeAge] = useState('25');
    const [employeeContribution, setEmployeeContribution] = useState('12');
    const [employerContribution, setEmployerContribution] = useState('3.67');
    const [annualIncrement, setAnnualIncrement] = useState('5');
    const [currentEPFBalance, setCurrentEPFBalance] = useState('0');
    const [interestRate, setInterestRate] = useState('8.25');
    const retirementAge = 58;

    const calculate = () => {
        const basic = parseFloat(basicSalary) || 0;
        const da = parseFloat(dearnessAllowance) || 0;
        const age = parseInt(employeeAge) || 25;
        const empContrib = parseFloat(employeeContribution) || 0;
        const erContrib = parseFloat(employerContribution) || 0;
        const increment = parseFloat(annualIncrement) || 0;
        const currentBalance = parseFloat(currentEPFBalance) || 0;
        const rate = parseFloat(interestRate) || 0;

        const yearsToRetirement = Math.max(0, retirementAge - age);
        const monthlyRate = rate / 100 / 12;

        let balance = currentBalance;
        let totalEmployeeContrib = 0;
        let totalEmployerContrib = 0;
        let currentBasicDA = basic + da;

        for (let year = 0; year < yearsToRetirement; year++) {
            for (let month = 0; month < 12; month++) {
                const empAmount = (currentBasicDA * empContrib) / 100;
                const erAmount = (currentBasicDA * erContrib) / 100;
                totalEmployeeContrib += empAmount;
                totalEmployerContrib += erAmount;
                balance = (balance + empAmount + erAmount) * (1 + monthlyRate);
            }
            currentBasicDA *= (1 + increment / 100);
        }

        const totalInterest = balance - totalEmployeeContrib - totalEmployerContrib - currentBalance;

        return {
            maturityAmount: Math.round(balance),
            totalEmployeeContrib: Math.round(totalEmployeeContrib),
            totalEmployerContrib: Math.round(totalEmployerContrib),
            totalInterest: Math.round(totalInterest),
            yearsToRetirement,
        };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');

    const handleReset = () => {
        setBasicSalary('25000'); setDearnessAllowance('5000'); setEmployeeAge('25');
        setEmployeeContribution('12'); setEmployerContribution('3.67'); setAnnualIncrement('5');
        setCurrentEPFBalance('0'); setInterestRate('8.25');
    };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-300 dark:border-emerald-700 mb-6">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">EPF Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">EPF</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Plan your retirement with EPF maturity projections</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Employee Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="input-group">
                                            <label htmlFor="basic" className="input-label">Basic Salary (₹)</label>
                                            <input id="basic" type="number" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} className="input" min="0" step="1000" />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="da" className="input-label">Dearness Allowance (₹)</label>
                                            <input id="da" type="number" value={dearnessAllowance} onChange={(e) => setDearnessAllowance(e.target.value)} className="input" min="0" step="500" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="input-group">
                                            <label htmlFor="age" className="input-label">Current Age</label>
                                            <input id="age" type="number" value={employeeAge} onChange={(e) => setEmployeeAge(e.target.value)} className="input" min="18" max="57" step="1" />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="balance" className="input-label">Current EPF Balance (₹)</label>
                                            <input id="balance" type="number" value={currentEPFBalance} onChange={(e) => setCurrentEPFBalance(e.target.value)} className="input" min="0" step="10000" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="input-group">
                                            <label htmlFor="empContrib" className="input-label">Employee Contribution (%)</label>
                                            <input id="empContrib" type="number" value={employeeContribution} onChange={(e) => setEmployeeContribution(e.target.value)} className="input" min="0" max="100" step="0.1" />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="erContrib" className="input-label">Employer EPF (%)</label>
                                            <input id="erContrib" type="number" value={employerContribution} onChange={(e) => setEmployerContribution(e.target.value)} className="input" min="0" max="100" step="0.01" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="input-group">
                                            <label htmlFor="increment" className="input-label">Annual Salary Increment (%)</label>
                                            <input id="increment" type="number" value={annualIncrement} onChange={(e) => setAnnualIncrement(e.target.value)} className="input" min="0" max="30" step="0.5" />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="rate" className="input-label">EPF Interest Rate (%)</label>
                                            <input id="rate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input" min="0" max="15" step="0.05" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-emerald-200 dark:border-emerald-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">EPF Maturity Amount</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">₹{fmt(result.maturityAmount)}</div>
                                    <p className="text-xs text-text-tertiary mt-2">At retirement (age {retirementAge}) • {result.yearsToRetirement} years</p>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Contribution Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Employee Contribution</span>
                                            <span className="font-semibold">₹{fmt(result.totalEmployeeContrib)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Employer Contribution</span>
                                            <span className="font-semibold">₹{fmt(result.totalEmployerContrib)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Interest Earned</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Total Corpus</span>
                                            <span className="text-xl font-bold">₹{fmt(result.maturityAmount)}</span>
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
