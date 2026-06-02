import {Router, Request, Response} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { requireAuth } from '../middleware/auth.middleware';
dotenv.config();

const router = Router();

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })

);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/login`,

    }),
    (req, res) => {
        const user = req.user as any;
        const token = jwt.sign({
            id:user._id,
            email: user.email
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    });
    res.redirect(`${process.env.FRONTEND_URL}/students`);
}
);

router.get('/me', requireAuth, (req: Request, res: Response) => {
     res.status(200).json((req as any).user);
});


router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    });
    res.json({ message: 'Logged out successfully' });

});
export default router;