/*
 * @Author: weizheng
 * @Date: 2021-07-12 17:09:02
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-12 17:57:30
 */
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

export default app;
