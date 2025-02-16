'use strict';

/**
 * advice controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::advice.advice');
