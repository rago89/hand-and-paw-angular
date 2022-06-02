const helmetHeaders = {
  contentSecurityPolicy: {
    directives: {
      "default-src": [
        "api.iconify.design",
        "api.simplesvg.com",
        "api.unisvg.com",
        "api.emailjs.com",
      ],
      "connect-src": [
        "'self'",
        "api.cloudinary.com",
        "api.iconify.design",
        "api.simplesvg.com",
        "api.unisvg.com",
        "api.emailjs.com",
      ],
      "script-src": [
        "'self'",
        "cdn.jsdelivr.net",
        "unpkg.com",
        "'unsafe-inline'",
        "'unsafe-eval'",
      ],
      "style-src": [
        "'self'",
        "cdn.jsdelivr.net",
        "fonts.googleapis.com",
        "'unsafe-inline'",
        "'unsafe-eval'",
      ],
      "img-src": [
        "'self'",
        "res.cloudinary.com",
        "data:",
        "'unsafe-inline'",
        "'unsafe-eval'",
      ],
      "font-src": [
        "'self'",
        "fonts.gstatic.com",
        "'unsafe-inline'",
        "'unsafe-eval'",
      ],
    },
  },
};

module.exports = helmetHeaders;
