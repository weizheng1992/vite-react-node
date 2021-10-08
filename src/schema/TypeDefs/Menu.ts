import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

// id!: number;

//   @Column()
//   parentId!: number;

//   @Column()
//   name!: string;

//   @Column()
//   url!: string;

//   @Column()
//   perms!: string;

//   @Column()
//   type!: number;

//   @Column()
//   icon!: string;

//   @Column()
//   sort!: number;

export const MenuType = new GraphQLObjectType({
  name: 'Menu',
  fields: () => ({
    id: { type: GraphQLID },
    parentId: { type: GraphQLInt },
    name: { type: GraphQLString, description: '菜单名字' },
    path: { type: GraphQLString, description: '组件路径' },
    url: { type: GraphQLString, description: '路由' },
    perms: { type: GraphQLString, description: '授权(多个用逗号分隔，如：user:list,user:create)' },
    type: { type: GraphQLString, description: '0：目录   1：菜单   2：按钮' },
    icon: { type: GraphQLString, description: '图标' },
    sort: { type: GraphQLString, description: '排序' },
  }),
});
