/*
 * @Author: weizheng
 * @Date: 2021-06-18 15:19:05
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-21 21:47:34
 */
import express from 'express';
import { jwtAuth, decode } from '@/utils/user-jwt';

import { NextFunction, Request, Response, Errback } from 'express';
import userRouter from './user';
import menuRouter from './menu'

const router = express.Router();
router.use('/',jwtAuth); // 注入认证模块

router.use('/api', userRouter); // 注入用户路由模块
router.use('/api', menuRouter); // 注入菜单管理


export default router;
