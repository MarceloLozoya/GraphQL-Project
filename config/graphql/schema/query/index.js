module.exports = ''.concat(

    `
    type Query {`,
        require('./definitions/EventQueries'),
        require('./definitions/LocationQueries'),
        require('./definitions/OrganizationQueries'),
    `}
    
    `

);