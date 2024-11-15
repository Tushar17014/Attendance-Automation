/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/teacher/:path*',
                destination: '/base/:path*',
            },
            {
                source: '/admin/:path*',
                destination: '/adminBase/:path*'
            },
            {
                source: '/student/:path*',
                destination: '/studentBase/:path*'
            }
        ];
    },
};

export default nextConfig;
