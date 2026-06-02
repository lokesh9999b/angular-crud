import jwt from 'jsonwebtoken';

export function requireAuth(req: any, res: any, next: any) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET!);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }

}