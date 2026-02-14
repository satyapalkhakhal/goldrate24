'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                router.push('/admin');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 mb-4">
                        <span className="text-2xl font-bold text-slate-900">G</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">GoldRate24 Admin</h1>
                    <p className="text-slate-400 mt-2">Sign in to manage your content</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@goldrate24.in"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-slate-900" />
                        ) : (
                            <>
                                Sign In <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-600 mt-6">
                    Protected admin area. Unauthorized access prohibited.
                </p>
            </div>
        </div>
    );
}
