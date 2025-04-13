'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service('plugin::graphql.extension');

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        extend type Mutation {
          incrementField(
            contentType: String!
            id: ID!
            field: String!
            amount: Int!
          ): Boolean
        }
      `,
      resolvers: {
        Mutation: {
          incrementField: {

            resolve: async (_parent, { contentType, id, field, amount }, ctx) => {
              const model = strapi.db.metadata.get(contentType);
              if (!model) {
                throw new Error(`Invalid content type: ${contentType}`);
              }
              if (!model.attributes[field] || model.attributes[field].type !== 'integer') {
                throw new Error(`Field '${field}' is not a valid number field in ${contentType}`);
              }
              const tableName = strapi.db.metadata.get(contentType)?.collectionName;
              if (!tableName) {
                throw new Error(`No table found for content type: ${contentType}`);
              }
              const knex = strapi.db.connection;

              const result = await knex(tableName)
                .where({ id })
                .increment(field, amount)
                .returning(['id', field]);

              if (!result.length) {
                throw new Error(`Entry with id=${id} not found`);
              }

              return true;
            },

          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) { },
};

