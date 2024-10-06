'use strict';

/**
 * external-media service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::external-media.external-media');
