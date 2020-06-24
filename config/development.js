'use strict';
module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    mongoURL: process.env.MONGOLAB_URL || 'mongodb://127.0.0.1/snipe',
    noFrontendCaching: process.env.NO_CACHE || 'yes',
    frontendCacheExpiry: process.env.FRONTEND_CACHE_EXPIRY || '90',
    backendCacheExpiry: process.env.BACKEND_CACHE_EXPIRY || '90',
    rateLimit: process.env.RATE_LIMIT || '1800',
    rateLimitExpiry: process.env.RATE_LIMIT_EXPIRY || '3600000',
    redisURL: process.env.REDIS_URL || 'redis://127.0.0.1:6379/1',
    maxContentLength: process.env.MAX_CONTENT_LENGTH || '9999',
    enforceSSL: process.env.ENFORCE_SSL || 'no',
};
