import { GraphQLList, GraphQLString } from 'graphql';
import { UserType, LoginType } from '../TypeDefs/User';
import { MessageType } from '../TypeDefs/Messages';
import { queryOne, querySql } from '@/config/config.default';
import { regSelect } from '@/services/user';
import { Users } from '@/entity/User';
import { hash, compare } from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { systemConfig } from '@/config/index';

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  // type: UserType,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(_: any, args: any, context: any) {
    const tokenUser = context();
    if (!tokenUser) {
      throw new Error('用户未登录!');
    }
    const { username } = args;
    const user = await Users.find(username);
    return user;
  },
};

export const LOGIN = {
  type: LoginType || MessageType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, password } = args;
    const user = await Users.findOne({ where: { username } });
    console.log('login', user);
    if (!user) {
      throw new Error('没有此用户');
    }
    const userPassword = user?.password;
    // const pwd = await hash(password, 10);
    // console.log('pwd', pwd);
    const isValid = await compare(password, userPassword);
    if (isValid) {
      const token = jsonwebtoken.sign({ id: user.id }, systemConfig.PRIVATE_KEY, {
        algorithm: 'HS256',
        expiresIn: '1y',
      });
      return { id: user.id, token };
    } else {
      throw new Error('旧密码不匹对!');
    }
  },
};
