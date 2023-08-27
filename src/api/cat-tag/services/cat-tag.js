'use strict';

/**
 * cat-tag service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cat-tag.cat-tag');
