import express from 'express';
import userRouter from './user';
import { jwtAuth } from '@/utils/user-jwt';

import { NextFunction, Request, Response, Errback } from 'express';

const router = express.Router();
router.use(jwtAuth); // 注入认证模块

router.use('/api', userRouter); // 注入用户路由模块

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
