module.exports = `

    type Location {
        _id: ID!
        name: String
        address: String
        latitude: String
        longitude: String
        organization: Organization
        createdAt: String
        updatedAt: String
    }
    
    input LocationInput {
        name: String
        address: String
        latitude: String
        longitude: String
        organization: String
    }

`;