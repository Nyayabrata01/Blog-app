const JWT = require("jsonwebtoken");

const secret = "NyayaBrata@69"; // Replace with an environment-stored key for production

// Generate a JWT token
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  return JWT.sign(payload, secret, { expiresIn: "1h" }); // Token expires in 1 hour
}

const jwt = require("jsonwebtoken");

function validateToken(token) {
  // Replace "your_secret_key" with your actual secret key
  return jwt.verify(token, secret);
}
module.exports = {
  createTokenForUser,
  validateToken,
};
