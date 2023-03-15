import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { DataProvider } from 'react-admin';

const API_URL = 'http://localhost:4000/gql';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },

    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

const fields: Record<string, string> = {
  Cat: 'id name',
};

const without = (resource: string, fields_: string[]) =>
  fields[resource].split(' ').filter((field) => !fields_.includes(field));

const editFields: Record<string, string[]> = {
  Cat: without('Cat', ['id']),
};

const dataProvider: DataProvider = {
  async getList(resource, { pagination, sort }) {
    const { page, perPage } = pagination;

    const offset = (page - 1) * perPage;
    const limit = perPage;
    const { field, order } = sort;
    const sortVar = { order, field: field.toUpperCase() };

    const method = `list${resource}`;

    const result = await client.query({
      query: gql`
                query ($offset: Int, $limit: Int!, $sort: ${resource}SortInput) {
                    ${method}(offset: $offset, limit: $limit, sort: [$sort]){
                        count
                        results {
                            ${[fields[resource]]}
                        }
                    }
                }
            `,
      variables: {
        offset,
        limit,
        sort: sortVar,
      },
    });
    return {
      data: result.data[method].results,
      total: result.data[method].count,
    };
  },
  async getOne(resource, params) {
    const method = `get${resource}`;
    const result = await client.query({
      query: gql`
                query ($id: ID!) {
                    ${method}(id: $id) {
                        ${fields[resource]}
                    }
                }
            `,
      variables: {
        id: params.id,
      },
    });
    return { data: result.data[method] };
  },

  async delete(resource, params) {
    const method = `destroy${resource}`;
    const result = await client.mutate({
      mutation: gql`
                mutation ($id: ID){
                    ${method}(id: $id) {
                        result{
                            ${fields[resource]}
                        }
                    }
                }
            `,
      variables: {
        id: params.id,
      },
    });
    return { data: result.data[method].result };
  },
  async create(resource, params) {
    const method = `create${resource}`;
    const result = await client.mutate({
      mutation: gql`
                mutation ($input: Create${resource}Input) {
                    ${method}(input: $input) {
                        result {
                            ${fields[resource]}
                        }
                    }
                }
            `,
      variables: {
        input: params.data,
      },
    });

    return { data: result.data[method].result };
  },
  async update(resource, params) {
    const method = `update${resource}`;
    const input = Object.keys(params.data)
      .filter((key) => editFields[resource].includes(key))
      .reduce((obj, key) => {
        obj[key] = params.data[key];
        return obj;
      }, {});
    const result = await client.mutate({
      mutation: gql`
                mutation ($id: ID, $input: Update${resource}Input) {
                    ${method}(id: $id, input: $input) {
                        result {
                            ${fields[resource]}
                        }
                    }
                }
            `,
      variables: {
        input,
        id: params.id,
      },
    });

    return { data: result.data[method].result };
  },
};

export default dataProvider;
