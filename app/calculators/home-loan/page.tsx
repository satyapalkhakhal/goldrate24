'use client';

import { useState } from 'react';
import { Home, RotateCcw, Download, TrendingUp } from 'lucide-react';

export default function HomeLoanCalculatorPage() {
    const [loanAmount, setLoanAmount] = useState('5000000');
    const [interestRate, setInterestRate] = useState('8.5');
    const [tenure, setTenure] = useState('20');
    const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

    const calculateEMI = () => {
        const P = parseFloat(loanAmount) || 0;
        const r = (parseFloat(interestRate) || 0) / 12 / 100;
        const n = tenureType === 'years'
            ? (parseFloat(tenure) || 0) * 12
            : parseFloat(tenure) || 0;

        if (P === 0 || r === 0 || n === 0) {
            return {
                emi: 0,
                totalAmount: 0,
                totalInterest: 0,
                principalAmount: P,
            };
        }

        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalAmount = emi * n;
        const totalInterest = totalAmount - P;

        return {
            emi,
            totalAmount,
            totalInterest,
            principalAmount: P,
        };
    };

    const result = calculateEMI();
    const tenureInMonths = tenureType === 'years'
        ? (parseFloat(tenure) || 0) * 12
        : parseFloat(tenure) || 0;

    const handleReset = () => {
        setLoanAmount('5000000');
        setInterestRate('8.5');
        setTenure('20');
        setTenureType('years');
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-300 dark:border-blue-700 mb-6">
                            <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                                Home Loan EMI Calculator
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                Home Loan
                            </span> Calculator
                        </h1>

                        <p className="text-lg text-text-secondary">
                            Calculate your monthly EMI, total interest, and plan your home loan repayment
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Input Form */}
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Loan Details</h2>
                                    <button
                                        onClick={handleReset}
                                        className="btn-secondary text-sm py-2 px-4"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Reset
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Loan Amount */}
                                    <div className="input-group">
                                        <label htmlFor="loanAmount" className="input-label">
                                            Loan Amount (₹)
                                        </label>
                                        <input
                                            id="loanAmount"
                                            type="number"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(e.target.value)}
                                            className="input"
                                            placeholder="Enter loan amount"
                                            min="0"
                                            step="100000"
                                        />
                                        <div className="flex gap-2 mt-2">
                                            {[2500000, 5000000, 10000000].map((amount) => (
                                                <button
                                                    key={amount}
                                                    onClick={() => setLoanAmount(amount.toString())}
                                                    className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    ₹{(amount / 100000).toFixed(0)}L
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Interest Rate */}
                                    <div className="input-group">
                                        <label htmlFor="interestRate" className="input-label">
                                            Interest Rate (% per annum)
                                        </label>
                                        <input
                                            id="interestRate"
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(e.target.value)}
                                            className="input"
                                            placeholder="Enter interest rate"
                                            min="0"
                                            max="20"
                                            step="0.1"
                                        />
                                        <div className="flex gap-2 mt-2">
                                            {[7.5, 8.5, 9.5].map((rate) => (
                                                <button
                                                    key={rate}
                                                    onClick={() => setInterestRate(rate.toString())}
                                                    className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    {rate}%
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tenure */}
                                    <div className="input-group">
                                        <label htmlFor="tenure" className="input-label">
                                            Loan Tenure
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                id="tenure"
                                                type="number"
                                                value={tenure}
                                                onChange={(e) => setTenure(e.target.value)}
                                                className="input flex-1"
                                                placeholder="Enter tenure"
                                                min="1"
                                                step="1"
                                            />
                                            <select
                                                value={tenureType}
                                                onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                                                className="input w-32"
                                            >
                                                <option value="years">Years</option>
                                                <option value="months">Months</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            {[10, 15, 20, 30].map((years) => (
                                                <button
                                                    key={years}
                                                    onClick={() => {
                                                        setTenure(years.toString());
                                                        setTenureType('years');
                                                    }}
                                                    className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    {years}Y
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Breakdown */}
                                <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800">
                                    <h3 className="font-semibold mb-4">Payment Breakdown</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-3 rounded-full bg-blue-200 dark:bg-blue-900 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${result.totalAmount > 0 ? (result.principalAmount / result.totalAmount) * 100 : 0}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium w-24 text-right">
                                                {result.totalAmount > 0
                                                    ? ((result.principalAmount / result.totalAmount) * 100).toFixed(1)
                                                    : 0}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Principal</span>
                                            <span className="font-semibold">
                                                ₹{result.principalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 mt-4">
                                            <div className="flex-1 h-3 rounded-full bg-orange-200 dark:bg-orange-900 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${result.totalAmount > 0 ? (result.totalInterest / result.totalAmount) * 100 : 0}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium w-24 text-right">
                                                {result.totalAmount > 0
                                                    ? ((result.totalInterest / result.totalAmount) * 100).toFixed(1)
                                                    : 0}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Interest</span>
                                            <span className="font-semibold">
                                                ₹{result.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* EMI Card */}
                                <div className="card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                                            <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-text-secondary">Monthly EMI</div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                                ₹{result.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-tertiary">
                                        Pay this amount every month for {tenureInMonths} months
                                    </p>
                                </div>

                                {/* Summary Card */}
                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Loan Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Principal Amount</span>
                                            <span className="font-semibold">
                                                ₹{result.principalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Interest</span>
                                            <span className="font-semibold text-error">
                                                ₹{result.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Total Amount</span>
                                            <span className="text-xl font-bold">
                                                ₹{result.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Download Button */}
                                <button className="btn-primary w-full">
                                    <Download className="w-5 h-5" />
                                    Download Amortization Schedule
                                </button>

                                {/* Info Card */}
                                <div className="card p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                                    <h4 className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-200">
                                        💡 Pro Tip
                                    </h4>
                                    <p className="text-xs text-amber-800 dark:text-amber-300">
                                        Making prepayments can significantly reduce your total interest.
                                        Even small additional payments can save lakhs over the loan tenure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
