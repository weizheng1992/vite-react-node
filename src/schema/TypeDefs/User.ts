import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    mobile: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    mobile: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

export const UserLimitType = new GraphQLObjectType({
  name: 'UserLimit',
  fields: () => ({
    total: { type: GraphQLInt },
    list: { type: new GraphQLList(UserType) },
  }),
});
