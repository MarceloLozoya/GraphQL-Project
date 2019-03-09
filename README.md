# GraphQL Project

<p>A Node.js server with a GraphQL based API, connected to a cloud Mongo database.</p>

<p><b>Note</b>: As a convenience, all calls to this server will point to it's GraphQL implementation. Written and tested in Node v7.2.0.</p>

<hr>

### How to Start

    > npm install
    > npm start

<hr>

### Event Queries
<code>**event(id: ID!): Event** - Find by id</code> <br />
<code>**events(name: String): [Event]** - Find by name, or get all if name is empty</code> <br />
<code>**eventsIn(ids: [ID]): [Event]** - Find events for a list of ids</code>

### Event Mutations
<code>**createEvent(input: EventInput!): Event**</code> <br />
<code>**updateEvent(id: ID!, input: EventInput!): Event**</code> <br />
<code>**deleteEvent(id: ID!): ID**</code>

### Event Types

    type Event {
        _id: ID!
        name: String!
        date: String            - "2019-03-08T15:49:55.285Z" format
        description: String
        organization: Organization
        createdAt: String
        updatedAt: String
    }

    input EventInput {
        name: String
        date: String
        description: String
        organization: String    - Organization Id
    }
        
        

<hr>

### Location Queries
<code>**location(id: ID!): Location** - Find by id</code> <br />
<code>**locations(name: String): [Location]** - Find by name, or get all if name is empty</code> <br />
<code>**locationsIn(ids: [ID]): [Location]** - Find locations for a list of ids</code>

### Location Mutations
<code>**createLocation(input: LocationInput!): Location**</code> <br />
<code>**updateLocation(id: ID!, input: LocationInput!): Location**</code> <br />
<code>**deleteLocation(id: ID!): ID**</code>

### Location Types

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
        organization: String    - Organization Id
    }

<hr>

### Organization Queries
<code>**organization(id: ID!): Organization** - Find by id</code> <br />
<code>**organizations(name: String): [Organization]** - Find by name, or get all if name is empty</code> <br />

### Organization Mutations
<code>**createOrganization(input: OrganizationInput!): Organization**</code> <br />
<code>**updateOrganization(id: ID!, input: OrganizationInput!): Organization**</code> <br />
<code>**deleteOrganization(id: ID!): ID**</code>

### Organization Types

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
        
<p>&nbsp;</p>