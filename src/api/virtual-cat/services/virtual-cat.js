'use strict';

/**
 * virtual-cat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::virtual-cat.virtual-cat');
