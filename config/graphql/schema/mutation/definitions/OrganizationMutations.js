module.exports = `

createOrganization(input: OrganizationInput!): Organization
updateOrganization(id: ID!, input: OrganizationInput!): Organization
deleteOrganization(id: ID!): ID

`;