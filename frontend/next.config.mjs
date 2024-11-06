/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/base/:path*',
            },
        ];
    },
};

export default nextConfig;
