/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://pdf:eCkdJo1drSxeGSuQ@cluster0.r1nyd.mongodb.net/next-store?retryWrites=true&w=majority",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
