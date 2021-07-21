/*
 * @Author: weizheng
 * @Date: 2021-07-12 17:09:02
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-21 21:50:47
 */
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import routes from '@/routes';
import cors from 'cors';
import { jwtAuth, decode } from '@/utils/user-jwt';

const app = express();

// 压缩
app.use(compression());

// 请求解析json
app.use(express.json());
//请求解析formData;
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors()); // 注入cors模块解决跨域
/* 路由 */
app.use('/', routes);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
      console.log("error-------",error)
      return next(error);
    }
  }
});

// 自定义统一异常处理中间件，需要放在代码最后
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
export default app;
