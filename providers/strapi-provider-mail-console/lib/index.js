module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: async (options) => {
        const { from, to, subject, text, ...rest } = options;
        strapi.log.debug(
          "MAILBOX\n\n" +
            `FROM: ${from}\n` +
            `TO: ${to}\n` +
            `SUBJECT: ${subject}\n` +
            "BODY:\n" +
            text +
            "\n\n\n"
        );
      },
    };
  },
};
