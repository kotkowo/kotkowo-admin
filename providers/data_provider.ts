import { DataProvider, UpdateParams } from 'react-admin';
import { gql } from '@apollo/client';
import client from './gql_client';
import { UpdateParamsWithImages, uploadImages } from './image_uploader';

const fields: Record<string, string> = {
  Cat: 'id name sex age fivFelvStatus healthStatus castrated images{id url filename uploadUrl}',
};

const without = (resource: string, fields_: string[]) =>
  fields[resource].split(' ').filter((field) => !fields_.includes(field));

const editFields: Record<string, string[]> = {
  Cat: without('Cat', ['id']).concat(['base64Image']),
};

const camelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const dataProvider: DataProvider = {
  async getList(resource, { pagination, sort }) {
    const { page, perPage } = pagination;

    const offset = (page - 1) * perPage;
    const limit = perPage;
    const { field, order } = sort;
    const sortVar = { order, field: camelToSnakeCase(field).toUpperCase() };

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
  async update(resource: string, params: UpdateParams) {
    const method = `update${resource}`;
    let input = Object.keys(params.data)
      .filter((key) => editFields[resource].includes(key))
      .reduce((obj, key) => {
        obj[key] = params.data[key];
        return obj;
      }, {});

    if (params.data?.images !== undefined) {
      await uploadImages(client, resource, params.id, params as UpdateParamsWithImages)
    }

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
