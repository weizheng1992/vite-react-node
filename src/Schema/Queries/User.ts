import { GraphQLList, GraphQLString } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { queryOne, querySql } from '@/config/config.default';
import { regSelect } from '@/services/user';

export const GET_ALL_USERS = {
  // type: new GraphQLList(UserType),
  type: UserType,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    const { username } = args;
    // const user: any = await querySql(regSelect(username));
    // console.log('ssssss', user[0]);
    // return user;
    const user: any = await queryOne(regSelect(username));
    console.log('ssssss', user);
    return user;
  },
};
