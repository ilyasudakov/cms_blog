/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      tls: false,
      child_process: false,
      path: false,
      stream: false,
      constants: false,
    }
    return config
  },
}
