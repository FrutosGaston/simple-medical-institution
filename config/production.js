'use strict';
module.exports = {
    env: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 80,
    mongoURL: process.env.MONGODB_URI || 'mongodb://192.168.99.100/snipe',
    noFrontendCaching: process.env.NO_CACHE || 'no',
    frontendCacheExpiry: process.env.FRONTEND_CACHE_EXPIRY || '90',
    backendCacheExpiry: process.env.BACKEND_CACHE_EXPIRY || '90',
    rateLimit: process.env.RATE_LIMIT || '1800',
    rateLimitExpiry: process.env.RATE_LIMIT_EXPIRY || '3600000',
    redisURL: process.env.REDIS_URL || 'redis://192.168.99.100:6379/1',
    maxContentLength: process.env.MAX_CONTENT_LENGTH || '9999',
    enforceSSL: process.env.ENFORCE_SSL || 'no',
};
