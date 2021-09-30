import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_ALL_USERS, LOGIN } from './Queries/User';
import { GET_MENUS } from './Queries/Menu';

import { CREATE_USER, UPDATE_PASSWORD } from './Mutations/User';
import { CREATE_MENU } from './Mutations/Menu';

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllUsers: GET_ALL_USERS,
    login: LOGIN,
    getMenus: GET_MENUS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    // deleteUser: DELETE_USER,
    updateUsername: UPDATE_PASSWORD,

    createMenu: CREATE_MENU,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
