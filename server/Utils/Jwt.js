const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Generates a JWT token.
   *
   * This function creates a JSON Web Token (JWT) using the provided user ID. The token is signed with a secret key and expires in 1 day.
   *
   * @param {string} id - The user ID to include in the token payload.
   * @returns {string} The generated JWT token.
   *
   * @throws {string} If token generation fails, it throws the error message.
   */
  genJwToken: (id) => {
    try {
      const payload = { id };
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
    } catch (error) {
      throw error?.message;
    }
  },
};
