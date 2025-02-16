'use strict';

/**
 * advice router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::advice.advice');
