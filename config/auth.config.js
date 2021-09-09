module.exports = {
  TOKEN_KEY: "secret",
  jwtExpiration: 15, // 1 hour
  jwtRefreshExpiration: 60, // 24 hours

  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};
