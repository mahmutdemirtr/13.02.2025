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
};
