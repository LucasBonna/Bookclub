import { Router, Request, Response } from 'express';
import productRoutes from './products.routes';
import userRoutes from './users.routes';

const router = Router();

router.get('/', (req: Request<{}, any, any, { [key: string]: any }>, res: Response) => {
  const isAuthenticated = (req as any).oidc.isAuthenticated();
  res.send(isAuthenticated ? 'Logged in' : 'Logged out');
});

router.use('/products', productRoutes);

router.use('/users', userRoutes);

export default router;