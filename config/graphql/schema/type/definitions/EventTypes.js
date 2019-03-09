module.exports = `

    type Event {
        _id: ID!
        name: String!
        date: String
        description: String
        organization: Organization
        createdAt: String
        updatedAt: String
    }
    
    input EventInput {
        name: String
        date: String
        description: String
        organization: String
    }

`;