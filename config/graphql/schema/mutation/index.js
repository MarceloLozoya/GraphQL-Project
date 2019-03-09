module.exports = ''.concat(

    `
    
    type Mutation {`,
        require('./definitions/EventMutations'),
        require('./definitions/LocationMutations'),
        require('./definitions/OrganizationMutations'),
    `}
    
    `

);