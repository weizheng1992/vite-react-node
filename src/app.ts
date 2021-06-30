/*
 * @Author: weizheng
 * @Date: 2021-06-17 15:47:05
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-30 11:51:31
 */
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import compression from 'compression';
import routes from '@/routes';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import { querySql } from '@/config/config.default';
import { regSelect } from '@/services/user';

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

const typeDefs = gql`
  type Todo {
    id: Int!
    username: String
  }
  type Query {
    hello: String
    todo(username: String): Todo
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    async todo(parent: any, args: any, context: any, info: any) {
      const user: any = await querySql(regSelect(args.username));
      console.log(user[0]);
      return user[0];
    },
    // todos:async () => {
    //   return await LibTodos.get_items()
    // },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

/* 路由 */
app.use('/', routes);

export default app;
