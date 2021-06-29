/*
 * @Author: weizheng
 * @Date: 2021-06-17 15:47:05
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-29 19:42:44
 */
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import compression from 'compression';
import routes from '@/routes';
import cors from 'cors';
import { schema } from '@/graphql/schema';

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

const root = { hello: () => 'Hello world!' };
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
/* 路由 */
app.use('/', routes);

export default app;
