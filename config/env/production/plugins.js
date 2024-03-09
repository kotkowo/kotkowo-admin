module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-mailjet",
      providerOptions: {
        publicApiKey: env("MAILJET_API_KEY"),
        secretApiKey: env("MAILJET_SECRET_KEY"),
      },
      settings: {
        defaultFrom: "info@ravensiris.xyz",
        defaultFromName: "Kotkowo",
        defaultTo: "info@ravensiris.xyz",
        defaultToName: "Kotkowo",
      },
    },
  },
});
