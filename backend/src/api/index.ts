import * as express from 'express';
import tourRouter from './routes/tourRouter';
import userRouter from './routes/userRouter';
import TokenAuthentication from './middlewares/tokenAuthentication';

const api = express();

api.use('/tours', TokenAuthentication, tourRouter);
api.use('/users', userRouter);

export default api;
