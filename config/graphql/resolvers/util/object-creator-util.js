const Event = require(`${__basedir}/models/Event`);
const Location = require(`${__basedir}/models/Location`);
const Organization = require(`${__basedir}/models/Organization`);

const helper = require('./helper-util');


let createEvent = (args) => {
    let inputExists = (args && args.input);

    return new Event({
        name: inputExists ? args.input.name : '',
        description: inputExists ? args.input.description : null,
        organization: inputExists ? args.input.organization : null,
        date: inputExists ? helper.getDateFromInput(args.input.date) : null
    });
};

let createLocation = (args) => {
    let inputExists = (args && args.input);

    return new Location({
        name: inputExists ? args.input.name : '',
        address: inputExists ? args.input.address : '',
        latitude: inputExists ? args.input.latitude : '',
        longitude: inputExists ? args.input.longitude : '',
        organization: inputExists ? args.input.organization : null
    });
};

let createOrganization = (args) => {
    return new Organization({
        name: (args && args.input) ? args.input.name : '',
        locations: [],
        events: []
    });
};


module.exports = {
    createEvent: createEvent,
    createLocation: createLocation,
    createOrganization: createOrganization
};