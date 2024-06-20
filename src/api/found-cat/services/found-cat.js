'use strict';

/**
 * found-cat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::found-cat.found-cat');
