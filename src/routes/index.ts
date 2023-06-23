import { Router, Request, Response } from 'express';
import productRoutes from './products.routes';
import userRoutes from './users.routes';
const { auth } = require('express-openid-connect');

const router = Router();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:4200',
    clientID: '7FbYvHkK305nznRVsgtXe6E1TloJUnrM',
    issuerBaseURL: 'https://dev-dwbdlu6vnrjb0hqw.us.auth0.com'
  };

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

router.get('/', (req: Request<{}, any, any, { [key: string]: any }>, res: Response) => {
  const isAuthenticated = (req as any).oidc.isAuthenticated();
  res.send(isAuthenticated ? 'Logged in' : 'Logged out');
});

router.use('/products', productRoutes);

router.use('/users', userRoutes);

export default router;