module.exports = `

event(id: ID!): Event
events(name: String): [Event]
eventsIn(ids: [ID]): [Event]

`;