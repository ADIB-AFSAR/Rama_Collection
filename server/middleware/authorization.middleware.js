const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
     let token = req.headers.authorization;

    // Check if token is present
    if (!token) {
        return res.status(401).json({
            message: "Token not found",
        });
    }

    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET); // Use env variable for secret
         
        if (verifyToken) {
            req.user = verifyToken.data;
            return next();
        }
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

module.exports = {
  authorization,
};
