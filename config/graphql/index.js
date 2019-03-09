const schema = require('./schema');
const resolvers = require('./resolvers');
const expressGraphQL = require('express-graphql');
const env = require(`${__basedir}/config/environment/env`);

module.exports = expressGraphQL({
    schema: schema,
    rootValue: resolvers,
    graphiql: env.ENVIRONMENT.toLowerCase() !== 'production'  // not for use in production
});