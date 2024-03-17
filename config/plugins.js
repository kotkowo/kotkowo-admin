module.exports = ({ env }) => ({
  graphql: {
    config: {
      apolloServer: {
        introspection: true
      }
    }
  },
  email: {
    config: {
      provider: "strapi-provider-mail-console",
      providerOptions: {},
      settings: {
        defaultFrom: "info@ravensiris.xyz",
        defaultFromName: "Kotkowo",
        defaultTo: "info@ravensiris.xyz",
        defaultToName: "Kotkowo",
      },
    },
  },
});
