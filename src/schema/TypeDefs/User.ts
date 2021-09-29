import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
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
