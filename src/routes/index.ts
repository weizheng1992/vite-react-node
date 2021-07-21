/*
 * @Author: weizheng
 * @Date: 2021-06-18 15:19:05
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-21 19:41:52
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

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  var token = req.headers['authorization'];
  if (token == undefined) {
    return next();
  } else {
    try {
      const decoded = decode(token);
      console.log("decoded",decoded)
      req.user = decoded;
      return next();
    } catch (error) {
      console.log("error",error)
      return next(error);
    }
  }
});

// 自定义统一异常处理中间件，需要放在代码最后
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // 自定义用户认证失败的错误返回
  console.log('err===', err);
  if (err && err.name === 'UnauthorizedError') {
    // 抛出401异常
    res.status(401).json({
      code: 401,
      msg: 'token失效，请重新登录',
      data: null,
    });
  } else if (err && err.name === 'TokenExpiredError') {
    // 抛出401异常
    res.status(401).json({
      code: 401,
      msg: 'token失效，请重新登录',
      data: null,
    });
  } else {
    // 错误码和错误信息
    const errCode = 500;
    const errMsg = err.message;
    res.status(errCode).json({
      code: errCode,
      msg: errMsg,
    });
  }
});

export default router;
