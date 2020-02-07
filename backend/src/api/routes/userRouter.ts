import { Router } from 'express';
import UserController from '../controllers/userController';
import TokenAuthentication from './../middlewares/tokenAuthentication';

const userRouter = Router();
const userCtrl = new UserController();

userRouter.post('/login', userCtrl.login);
userRouter.get('/managers', userCtrl.getManagers);

export default userRouter;
