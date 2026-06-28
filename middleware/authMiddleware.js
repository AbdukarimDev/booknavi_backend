const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: `Token yo'q` });
        } const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();

         
    } catch {
        res.status(401).json({ message: `Token yaroqsiz `});
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: `Ruxsat yo'q`});
    }
}
module.exports = { protect, isAdmin };