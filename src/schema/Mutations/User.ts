import { GraphQLID, GraphQLString } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { MessageType } from '../TypeDefs/Messages';
import { Users } from '@/entity/User';
import { hash } from 'bcryptjs';

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;
    // const res: any = await queryOne(regInsert(username, password));
    const res = await Users.insert({ name, username, password: await hash(password, 10) });
    const newId = res.raw.insertId;

    return { id: newId, username };
  },
};

export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id, oldPassword, newPassword } = args;
    const user = await Users.findOne(id);
    if (!user) {
      throw new Error('没有此用户');
    }
    const userPassword = user?.password;

    if (oldPassword === userPassword) {
      await Users.update({ id: id }, { password: newPassword });
    } else {
      throw new Error('旧密码不匹对!');
    }
    return { successful: true, message: '修改密码成功' };
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
