// next.config.js
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // This will match any API request
        destination: 'http://localhost:5000/api/:path*', // Replace with your backend URL
      },
    ];
  },
};

export default nextConfig;



