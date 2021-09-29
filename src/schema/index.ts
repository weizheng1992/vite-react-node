import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_ALL_USERS, LOGIN } from './Queries/User';
import { CREATE_USER, UPDATE_PASSWORD } from './Mutations/User';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUsers: GET_ALL_USERS,
    login: LOGIN,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    // deleteUser: DELETE_USER,
    updateUsername: UPDATE_PASSWORD,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
