import { GraphQLInt, GraphQLString } from 'graphql';
import { MessageType } from '../TypeDefs/Messages';
import { Menus } from '@/entity/Menu';

export const CREATE_MENU = {
  type: MessageType,
  args: {
    id: { type: GraphQLInt },
    parentId: { type: GraphQLInt },
    name: { type: GraphQLString },
    path: { type: GraphQLString },
    url: { type: GraphQLString },
    perms: { type: GraphQLString },
    type: { type: GraphQLInt },
    icon: { type: GraphQLString },
    sort: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any) {
    // const { parentId, name, path, url, perms, type, icon, sort } = args;
    // const res: any = await queryOne(regInsert(username, password));
    await Menus.insert(args);

    return { success: true, message: '添加成功' };
  },
};
