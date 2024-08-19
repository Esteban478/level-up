import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Add this line for debugging
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error); // Add this line for debugging
        res.status(401).json({ error: 'Token is not valid' });
    }
};