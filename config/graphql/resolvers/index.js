const merge = require('lodash.merge');

const eventResolvers = require('./definitions/EventResolvers');
const locationResolvers = require('./definitions/LocationResolvers');
const organizationResolvers = require('./definitions/OrganizationResolvers');


module.exports = merge(
    eventResolvers,
    locationResolvers,
    organizationResolvers
);