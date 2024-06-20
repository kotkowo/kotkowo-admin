'use strict';

/**
 * virtual-cat router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::virtual-cat.virtual-cat');
