const jwt = require('jsonwebtoken');

const varifyUser = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: "You are not Authenticated user", success: false });
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userId = decoded.id;
            req.userRole = decoded.role;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "invalid token", success: false, error });
        }
    }
}

module.exports = varifyUser