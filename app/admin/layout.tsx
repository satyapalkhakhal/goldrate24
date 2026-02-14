'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
    LayoutDashboard,
    FileText,
    FilePlus,
    LogOut,
    Menu,
    X,
    Newspaper,
    ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/articles', label: 'Articles', icon: Newspaper },
    { href: '/admin/articles/new', label: 'New Article', icon: FilePlus },
    { href: '/admin/pages', label: 'CMS Pages', icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check auth state
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user);
            } else if (pathname !== '/admin/login') {
                router.push('/admin/login');
            }
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUser(session.user);
            } else {
                setUser(null);
                if (pathname !== '/admin/login') {
                    router.push('/admin/login');
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [router, pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    // Show login page without layout
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-slate-800">
                        <Link href="/admin" className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-900 text-sm">
                                G
                            </div>
                            <div>
                                <h1 className="font-bold text-lg">GoldRate24</h1>
                                <p className="text-xs text-slate-400">Admin Panel</p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive
                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                  `}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User/Logout */}
                    <div className="p-4 border-t border-slate-800">
                        <div className="px-4 py-2 mb-2">
                            <p className="text-xs text-slate-500">Logged in as</p>
                            <p className="text-sm text-slate-300 truncate">{user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-slate-900/50 border-b border-slate-800 px-6 py-4 flex items-center gap-4 backdrop-blur-sm sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <h2 className="font-semibold text-lg capitalize">
                            {pathname === '/admin' ? 'Dashboard' : pathname.split('/').pop()?.replace(/-/g, ' ')}
                        </h2>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="text-xs text-slate-400 hover:text-amber-400 transition-colors px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-500/30"
                    >
                        View Site →
                    </Link>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
