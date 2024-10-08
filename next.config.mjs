/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "firebasestorage.googleapis.com",
      "www.google.com",
    ],
  },
};

export default nextConfig;
