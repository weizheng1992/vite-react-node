import { GraphQLString, GraphQLInt } from 'graphql';
import { LoginType, UserLimitType } from '../TypeDefs/User';
import { Users } from '@/entity/User';
import { compare } from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { systemConfig } from '@/config/index';

export const GET_ALL_USERS = {
  type: UserLimitType,
  // type: UserType,
  args: {
    page: { type: GraphQLInt },
    size: { type: GraphQLInt },
  },
  async resolve(_: any, args: any, context: any) {
    const tokenUser = context();
    if (!tokenUser) {
      throw new Error('用户未登录!');
    }
    const { page, size } = args;
    // const user = await Users.find({ take: page * size, skip: (page - 1) * size });
    const [user, number] = await Users.findAndCount({ take: page * size, skip: (page - 1) * size });
    return { total: number, list: user };
  },
};

export const LOGIN = {
  type: LoginType,
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
