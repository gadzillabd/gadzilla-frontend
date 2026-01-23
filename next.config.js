/** @type {import('next').NextConfig} */
const getApiConfig = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) return null;
  try {
    const url = new URL(apiUrl);
    return {
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
      port: url.port || undefined,
    };
  } catch {
    return null;
  }
};

const getMediaConfig = () => {
  const mediaDomain = process.env.NEXT_PUBLIC_MEDIA_DOMAIN;
  if (!mediaDomain) return null;
  try {
    // If it's a full URL, parse it
    if (mediaDomain.startsWith('http://') || mediaDomain.startsWith('https://')) {
      const url = new URL(mediaDomain);
      return {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port || undefined,
      };
    }
    // If it's just a domain, assume HTTPS
    return {
      protocol: 'https',
      hostname: mediaDomain,
    };
  } catch {
    return null;
  }
};

const apiConfig = getApiConfig();
const mediaConfig = getMediaConfig();

const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'lh3.googleusercontent.com',
  },
  // Cloudflare R2 media domain
  {
    protocol: 'https',
    hostname: '*.r2.cloudflarestorage.com',
    pathname: '/**',
  },
];

// Add media domain if configured
if (mediaConfig) {
  remotePatterns.push({
    protocol: mediaConfig.protocol,
    hostname: mediaConfig.hostname,
    ...(mediaConfig.port && { port: mediaConfig.port }),
    pathname: '/**',
  });
}

// Add API hostname if configured
if (apiConfig) {
  remotePatterns.push({
    protocol: apiConfig.protocol,
    hostname: apiConfig.hostname,
    ...(apiConfig.port && { port: apiConfig.port }),
    pathname: '/**',
  });
}

const nextConfig = {
  images: {
    remotePatterns,
    // For local development, don't optimize backend images (avoids 400 errors)
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
