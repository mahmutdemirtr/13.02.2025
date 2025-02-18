// next.config.js
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: "",
        pathname: '/**'
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      path: false, 
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ec2-100-27-214-198.compute-1.amazonaws.com:8000/api/:path*",
      },
    ];
  },
};
