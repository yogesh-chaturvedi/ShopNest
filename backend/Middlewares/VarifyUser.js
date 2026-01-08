const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User')

const varifyUser = async (req, res, next) => {
    const token = req.cookies.Token
    // console.log('token', token)
    if (!token) {
        return res.status(401).json({ message: "You are unauthorized", success: false });
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log('decoded', decoded)

            const user = await UserModel.findById(decoded.id)

            if (!user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }

            req.user = user
            // console.log("user", user)
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