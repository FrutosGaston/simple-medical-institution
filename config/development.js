'use strict';
module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    trustProxy: process.env.TRUST_PROXY || 'no',
    bugsnagKey: process.env.BUGSNAG_KEY || false,
    secureMode: process.env.SECURE_MODE || false,
    secret: process.env.SECRET || 'lakikihdgdfdjjjdgd67264664vdjhjdyncmxuei8336%%^#%gdvdhj????jjhdghduue',
    mongoURL: process.env.MONGOLAB_URL || 'mongodb://127.0.0.1/snipe',
    logMongoURL: process.env.LOG_MONGOLAB_URL || 'mongodb://127.0.0.1/snipelogs',
    noFrontendCaching: process.env.NO_CACHE || 'yes',
    frontendCacheExpiry: process.env.FRONTEND_CACHE_EXPIRY || '90',
    backendCacheExpiry: process.env.BACKEND_CACHE_EXPIRY || '90',
    rateLimit: process.env.RATE_LIMIT || '1800',
    rateLimitExpiry: process.env.RATE_LIMIT_EXPIRY || '3600000',
    redisURL: process.env.REDIS_URL || 'redis://127.0.0.1:6379/1',
    letsencryptSSLVerificationURL: process.env.LETSENCRYPT_VERIFICATION_URL || '/.well-known/acme-challenge/xvArhQBSilF4V30dGUagNAZ96ASipB0b0ex0kXn0za8',
    letsencryptSSLVerificationBody: process.env.LETSENCRYPT_VERIFICATION_BODY || 'xvArhQBSilF4V30dGUagNAZ96ASipB0b0ex0kXn0za8._v6aFbaRYWeOmSebtlD-X4Ixf5tPsyULMsXM8HjsK-Q',
    maxContentLength: process.env.MAX_CONTENT_LENGTH || '9999',
    enforceSSL: process.env.ENFORCE_SSL || 'no',
    gitOAuthToken: process.env.GIT_OAUTH_TOKEN || '86d6eb7abe03e8ae6a970cb67622e667c9c0f86a',
    enforceUserIdAppIdDeveloperId: process.env.ENFORCE_USER_ID_APP_ID_DEVELOPER_ID || 'no',
    apiDBKey: process.env.API_DB_Key || 'MDg4NWM1NTA0ZTZlNTQ5MjAzNzA1ODBlOWVkNzI3MzdlNmYxZTcyMjVkOTA3N2JjYTBhZjA0YmM0N2U4NDZkNi8vLy8vLzQ1MDY=',
    clockTimezone: process.env.CLOCK_TIMEZONE || 'Africa/Lagos',
    workerConcurrency: process.env.WORKER_CONCURRENCY || '1',
    logglyToken: process.env.LOGGLY_TOKEN || false,
    logglySubdomain: process.env.LOGGLY_SUBDOMAIN || false,
    logglyTag: process.env.LOGGLY_TAG || false,
    cleanUpFailedJobs: process.env.CLEANUP_FAILED_JOBS || 'yes'
};
