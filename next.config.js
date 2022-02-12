/** @type {import('next').NextConfig} */
const nextConfig = {
  NEXTAUTH_URL: "http://localhost:3000/",
  reactStrictMode: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "post.medicalnewstoday.com",
      "encrypted-tbn0.gstatic.com",
      "th-thumbnailer.cdn-si-edu.com",
      "www.akc.org",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
