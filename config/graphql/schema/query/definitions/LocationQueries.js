module.exports = `

location(id: ID!): Location
locations(name: String): [Location]
locationsIn(ids: [ID]): [Location]

`;