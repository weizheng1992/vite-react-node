import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { MenuType } from '../TypeDefs/Menu';
import { Menus } from '@/entity/Menu';

export const GET_MENUS = {
  type: new GraphQLList(MenuType),
  // type: UserType,
  // args: {
  //   page: { type: GraphQLInt },
  //   size: { type: GraphQLInt },
  // },
  async resolve(_: any, args: any, context: any) {
    const tokenUser = context();
    if (!tokenUser) {
      throw new Error('用户未登录!');
    }
    console.log('ssssss');
    const menus = await Menus.find();
    return menus;
  },
};
