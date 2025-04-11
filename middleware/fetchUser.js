const jwt = require('jsonwebtoken');
const authenticateToken = async(req, res, next) => {
    const token = req.header('auth-token');
    const SECRET_KEY = "ahmad123key" 
    
    if (!token) {
        return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }

    try {
        const data = jwt.verify(token, SECRET_KEY);
        req.user =data.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
module.exports = authenticateToken;