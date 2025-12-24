/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['api.example.com'], // Add your API domain if serving images
        formats: ['image/avif', 'image/webp'],
    },
    // Enable experimental features for better performance
    // experimental: {
    //     optimizeCss: true,
    // },
    // Headers for security and caching
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig
