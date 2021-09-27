import { GraphQLID, GraphQLString } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { MessageType } from '../TypeDefs/Messages';
import { queryOne } from '@/config/config.default';
import { regInsert, updataName, selectUserById } from '@/services/user';

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, password } = args;
    const res: any = await queryOne(regInsert(username, password));
    return { id: res.insertId, username, password };
  },
};

export const UPDATE_USERNAME = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    userId: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { userId, username } = args;
    const user: any = await queryOne(selectUserById(userId));
    if (!user) {
      throw new Error('没有此用户');
    }

    await queryOne(updataName(username, userId));
    return { successful: true, message: '修改用户名成功' };
  },
};

// export const DELETE_USER = {
//   type: MessageType,
//   args: {
//     id: { type: GraphQLID },
//   },
//   async resolve(parent: any, args: any) {
//     const id = args.id;
//     await Users.delete(id);

//     return { successful: true, message: 'DELETE WORKED' };
//   },
// };
