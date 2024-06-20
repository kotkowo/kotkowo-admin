'use strict';

/**
 * virtual-cat controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::virtual-cat.virtual-cat');
