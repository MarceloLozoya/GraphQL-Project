let { buildSchema } = require('graphql');

module.exports = buildSchema(
    ''.concat(

        require('./type'),
        require('./query'),
        require('./mutation')

    )
);