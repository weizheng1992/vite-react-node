import express from 'express';
import { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import routes from '@/routes';
import cors from 'cors';
import { jwtAuth, decode } from '@/utils/user-jwt';

const app = express();

// 压缩
app.use(compression());

// 请求解析json
app.use(express.json({ limit: '20mb' }));
// 请求解析formData
app.use(
  express.urlencoded({
    limit: '20mb',
    extended: false,
  })
);

app.use(cors()); // 注入cors模块解决跨域
app.use(jwtAuth);
/* 路由 */
app.get('/test', function (req: Request, res: Response) {
  res.json({
    hello: 'www',
  });
});
app.use('/', routes);
app.use(function (err: Error, req: Request, res: Response) {
  if (err.name === 'UnauthorizedError') {
    return res.status(403).send({
      code: false,
      message: 'No token provided.',
    });
  }
});
app.use(function (req: Request, res: Response) {
  res.status(404).send('Not found!');
});
// 中间件 处理 500 错误
app.use(function (err: Error, req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
