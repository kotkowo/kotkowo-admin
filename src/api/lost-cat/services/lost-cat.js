'use strict';

/**
 * lost-cat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lost-cat.lost-cat');
