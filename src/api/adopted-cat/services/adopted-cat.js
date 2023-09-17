'use strict';

/**
 * adopted-cat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::adopted-cat.adopted-cat');
