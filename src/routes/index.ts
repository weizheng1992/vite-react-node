import express from 'express';
import userRouter from './user';

import { NextFunction, Request, Response, Errback } from 'express';

const router = express.Router();

router.use('/api', userRouter); // 注入用户路由模块


export default  router;