'use strict';

/**
 * advice service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::advice.advice');
