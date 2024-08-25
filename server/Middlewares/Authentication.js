const { errorResponse } = require("../Utils/Response");
const { decodeJwtToken } = require("../Utils/Jwt");

module.exports = {
  authenticate: (req, res, next) => {
    try {
      const token = req.headers?.authorization?.split(" ").pop();
      console.log("token", token);
      if (!token) {
        errorResponse(
          res,
          "authentication token not found",
          "authentication failed",
          401
        );
      } else {
        const decode = decodeJwtToken(token);
        console.log("decode", decode.id);
        req.headers.userId = decode.id;
        next();
      }
    } catch (error) {
      errorResponse(res, error, "Error while decoding token", 401);
    }
  },
};
