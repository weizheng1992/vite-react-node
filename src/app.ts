/*
 * @Author: weizheng
 * @Date: 2021-06-17 15:47:05
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-12 17:07:16
 */
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import compression from 'compression';
import cors from 'cors';
import { schema } from './schema';
import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { decode } from '@/utils/user-jwt';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'my_test',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
}).catch((error) => console.log('sss', error));

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

/**
 * Verify token and return either error or valid user profile
 */
app.use('/verifyToken', (req, res) => {
  if (req.method === 'POST') {
    try {
      const token = req.headers['authorization'];
      if (!token) {
        res.status(401);
      }
      const user = decode(token);
      res.status(200).json({ user });
    } catch (e: any) {
      console.log(e.message);
      res.status(401).json({
        //unauthorized token
        message: e.message,
      });
    }
  }
});

//auth middleware
app.use('/graphql', (req: any, res: any, next: any) => {
  // console.log(',,,,', req);
  const token = req.headers['authorization'];
  if (!token) {
    // res.status(401);
    req.user = false;
    next();
  }
  try {
    req.user = decode(token);
    next();
  } catch (e: any) {
    req.user = false;
    // res.status(401).json({
    //   //unauthorized token
    //   message: e.message,
    // });
  }
});

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: () => decode(req.headers['authorization']),
    customFormatErrorFn: (err: any) => ({
      message: err.originalError.message || err.message,
      code: err.originalError.code || 500,
    }),
  }))
);
export default app;
