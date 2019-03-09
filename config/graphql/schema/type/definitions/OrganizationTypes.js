module.exports = `

    type Organization {
        _id: ID!
        name: String
        locations: [Location]
        events: [Event]
        createdAt: String
        updatedAt: String
    }
    
    input OrganizationInput {
        name: String
    }

`;