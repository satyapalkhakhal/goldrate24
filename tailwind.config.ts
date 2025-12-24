import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Semantic color tokens
                primary: 'hsl(var(--color-primary) / <alpha-value>)',
                'primary-hover': 'hsl(var(--color-primary-hover) / <alpha-value>)',
                secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
                accent: 'hsl(var(--color-accent) / <alpha-value>)',

                background: 'hsl(var(--color-background) / <alpha-value>)',
                surface: 'hsl(var(--color-surface) / <alpha-value>)',
                'surface-elevated': 'hsl(var(--color-surface-elevated) / <alpha-value>)',

                'text-primary': 'hsl(var(--color-text-primary) / <alpha-value>)',
                'text-secondary': 'hsl(var(--color-text-secondary) / <alpha-value>)',
                'text-tertiary': 'hsl(var(--color-text-tertiary) / <alpha-value>)',

                border: 'hsl(var(--color-border) / <alpha-value>)',
                'border-hover': 'hsl(var(--color-border-hover) / <alpha-value>)',

                success: 'hsl(var(--color-success) / <alpha-value>)',
                warning: 'hsl(var(--color-warning) / <alpha-value>)',
                error: 'hsl(var(--color-error) / <alpha-value>)',
                info: 'hsl(var(--color-info) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                playfair: ['var(--font-playfair)', 'serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
