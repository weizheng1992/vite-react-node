import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import routes from '@/routes';
import cors from 'cors';

const app = express();

// 压缩
app.use(compression());

// 请求解析json
app.use(bodyParser.json());
//请求解析formData;
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors()); // 注入cors模块解决跨域
/* 路由 */
app.use('/', routes);

export default app;
