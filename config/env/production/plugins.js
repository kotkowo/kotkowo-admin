module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-ipfs-storage",
      providerOptions: {
        defaultStorage: "pinata",
        pinata: { jwt: env("PINATA_JWT") },
      },
    },
  },
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
