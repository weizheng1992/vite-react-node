import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    mobile: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});
