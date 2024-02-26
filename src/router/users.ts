import {Router} from 'express';
import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: Router) => {
  const authenticatedRoutes = Router();

  // Apply common middleware to all routes instead of duplicating
  authenticatedRoutes.use(isAuthenticated, isOwner);

  authenticatedRoutes.get('/users', getAllUsers);
  authenticatedRoutes.delete('/user/:id', deleteUser);
  authenticatedRoutes.patch('/user/:id', updateUser);

  // Mount authenticated routes under specific path
  router.use('/authenticated', authenticatedRoutes);
}
