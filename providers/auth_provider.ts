import { gql } from '@apollo/client';
import { AuthProvider } from 'react-admin';
import client from './gql_client';

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const mutation = gql`
      mutation ($email: String!, $password: String!) {
        signInWithPassword(email: $email, password: $password) {
          token
        }
      }
    `;

    const result = await client.mutate({
      mutation,
      variables: {
        email: username,
        password,
      },
    });

    const token: string | undefined = result.data?.signInWithPassword?.token;

    if (token === undefined) {
      return Promise.reject('Server side returned no token');
    }

    localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  checkAuth: async () => {
    const query = gql`
      query {
        currentUser {
          id
          email
        }
      }
    `;

    const result = await client.query({
      query,
    });

    if (result.data?.currentUser?.id === undefined) {
      return Promise.reject();
    }
  },
  checkError: (errors) => {
    console.log(errors);
    return Promise.resolve();
  },
  getIdentity: () =>
    Promise.resolve({
      id: 'user',
      fullName: 'John Doe',
    }),
  getPermissions: () => Promise.resolve(''),
};

export default authProvider;
