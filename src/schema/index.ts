import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_ALL_USERS, LOGIN, GET_USER_LIMIT } from './Queries/User';
import { GET_MENUS } from './Queries/Menu';

import { CREATE_USER, UPDATE_PASSWORD, DELETE_USER } from './Mutations/User';
import { CREATE_MENU, UPDATE_MENU } from './Mutations/Menu';

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllUsers: GET_ALL_USERS,
    login: LOGIN,
    getUsersLimit: GET_USER_LIMIT,

    getMenus: GET_MENUS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUsername: UPDATE_PASSWORD,

    createMenu: CREATE_MENU,
    updateMenu: UPDATE_MENU,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
