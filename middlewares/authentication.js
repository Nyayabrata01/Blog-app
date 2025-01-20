const { validateToken } = require("../models/services/authentication");

function checkForAuthenticationCookie(req, res, next) {
  const tokenCookieValue = req.cookies.token; // Match the cookie name

  if (!tokenCookieValue) {
    // If no token cookie is found, proceed without user
    //req.user = null;
    return next();
  }

  try {
    // Validate the token and attach the user payload to req.user
    const userPayload = validateToken(tokenCookieValue);
    req.user = userPayload;
  } catch (error) {
    console.error("Token validation error:", error.message);
    req.user = null; // Clear user if token validation fails
  }

  return next(); // Proceed to the next middleware
}

module.exports = {
  checkForAuthenticationCookie,
};
