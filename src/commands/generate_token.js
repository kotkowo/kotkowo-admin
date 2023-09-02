const strapi = require("@strapi/strapi");
const { program } = require("commander");

const strapiClose = async (strapiInstance, code = 0) => {
  await strapiInstance.server.destroy();
  strapiInstance.stop(code);
};

program
  .version("0.1.0")
  .argument("<name>", "token name")
  .action(async (name) => {
    const strapiInstance = await strapi().load();
    const tokenService = await strapiInstance.service("admin::api-token");
    let alreadyExists = await tokenService.exists({ name });

    if (alreadyExists) {
      console.error(`Token with name: '${name}' already exists!`);
      await strapiClose(strapiInstance, 1);
    }

    const token = await tokenService.create({ name });
    console.log(token.accessKey);

    await strapiClose(strapiInstance);
  })
  .parse();
