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
        input IncrementFieldInput {
          contentType: String!
          id: ID!
          field: String!
          amount: Int!
        }

        extend type Mutation {
          incrementField(
            contentType: String!
            id: ID!
            field: String!
            amount: Int!
          ): Boolean

          incrementFields(updates: [IncrementFieldInput!]!): Boolean

          incrementFieldsAndUpdatePullDate(
            updates: [IncrementFieldInput!]!
            pull_date: String
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
              const tableName = model.collectionName;
              if (!tableName) {
                throw new Error(`No table found for content type: ${contentType}`);
              }
              const knex = strapi.db.connection;
              await knex(tableName)
                .where({ id })
                .increment(field, amount);
              // We dont query for any result and ignore missing ids
              return true;
            },
          },
          incrementFields: {
            resolve: async (_parent, { updates }, _ctx) => {
              const knex = strapi.db.connection;
              return await knex.transaction(async (trx) => {
                for (const update of updates) {
                  const { contentType, id, field, amount } = update;
                  const model = strapi.db.metadata.get(contentType);
                  if (!model) {
                    throw new Error(`Invalid content type: ${contentType}`);
                  }
                  if (!model.attributes[field] || model.attributes[field].type !== 'integer') {
                    throw new Error(`Field '${field}' is not a valid number field in ${contentType}`);
                  }
                  const tableName = model.collectionName;
                  if (!tableName) {
                    throw new Error(`No table found for content type: ${contentType}`);
                  }
                  await trx(tableName)
                    .where({ id })
                    .increment(field, amount)
                }
                // We dont query for any result and ignore missing ids
                return true;

              });
            },
          },
          incrementFieldsAndUpdatePullDate: {
            resolve: async (_parent, { updates, pull_date }, _ctx) => {
              const knex = strapi.db.connection;

              return await knex.transaction(async (trx) => {
                for (const update of updates) {
                  const { contentType, id, field, amount } = update;
                  const model = strapi.db.metadata.get(contentType);

                  if (!model) {
                    throw new Error(`Invalid content type: ${contentType}`);
                  }
                  if (!model.attributes[field] || model.attributes[field].type !== 'integer') {
                    throw new Error(`Field '${field}' is not a valid number field in ${contentType}`);
                  }

                  const tableName = model.collectionName;
                  if (!tableName) {
                    throw new Error(`No table found for content type: ${contentType}`);
                  }
                  await trx(tableName)
                    .where({ id })
                    .increment(field, amount);
                  // ignoring results
                }

                const lastPullDateModel = strapi.db.metadata.get('api::last-view-pull.last-view-pull');
                if (!lastPullDateModel) {
                  throw new Error('Last pull date model not found');
                }

                const lastPullDateTable = lastPullDateModel.collectionName;

                if (pull_date && !pull_date.includes('T')) {
                  if (pull_date === 'now') {
                    const now = new Date();
                    pull_date = now.toISOString();
                  }
                }

                const existingPullDate = await trx(lastPullDateTable)
                  .first()
                  .orderBy('id', 'asc');

                if (existingPullDate) {
                  await trx(lastPullDateTable)
                    .where({ id: existingPullDate.id })
                    .update({ pull_date: pull_date });
                } else {
                  await trx(lastPullDateTable)
                    .insert({ pull_date: pull_date });
                }
                return true;
              });
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
