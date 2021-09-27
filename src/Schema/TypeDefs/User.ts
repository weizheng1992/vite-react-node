import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    userId: { type: GraphQLID },
    username: { type: GraphQLString },
    mobile: { type: GraphQLString },
    password: { type: GraphQLString },
    salt: { type: GraphQLString },
    email: { type: GraphQLString },
    status: { type: GraphQLID },
    deptId: { type: GraphQLID },
    createTime: { type: GraphQLString },
  }),
});
