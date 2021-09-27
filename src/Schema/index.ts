import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_ALL_USERS } from './Queries/User';
import { CREATE_USER, UPDATE_USERNAME } from './Mutations/User';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUsers: GET_ALL_USERS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    // deleteUser: DELETE_USER,
    updateUsername: UPDATE_USERNAME,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
