const helper = require('../util/helper-util');
const Event = require(`${__basedir}/models/Event`);
const objectCreator = require('../util/object-creator-util');


/**
 * Find an Event by id
 */
let event = (args) => {
    return Event
        .findById(args.id)
        .populate('organization')
        .then(result => {
            return helper.transformResult(result);
        })
        .catch(err => {
            throw err;
        });
};

/**
 * Find an Event by name
 */
let events = (args) => {
    let queryObj = args && args.name ? {name: args.name} : null;
    return Event
        .find(queryObj)
        .populate('organization')
        .then(result => {
            return result.map(org => {
                return helper.transformResult(org);
            });
        })
        .catch(err => {
            throw err;
        });
};

/**
 * Find Events given a list of ids
 */
let eventsIn = (args) => {
    return Event
        .find({ _id: { $in: args.ids } })
        .populate('organization')
        .then(result => {
            return result.map(org => {
                return helper.transformResult(org);
            });
        })
        .catch(err => {
            throw err;
        });
};

/**
 * Create a new Event
 */
let createEvent = (args) => {

    let event = objectCreator.createEvent(args);

    return event
        .save()
        .then(result => {
            return result.populate('organization')
                .execPopulate()
                .then(populateResult => {

                    if (args && args.input && args.input.organization) {
                        helper.updateOrganizationEvent(null, args.input.organization, populateResult.id);
                    }

                    return helper.transformResult(populateResult);
                })
                .catch(populateErr => {
                    throw populateErr;
                });
        })
        .catch(err => {
            throw err;
        });
};

/**
 * Update an Event by id. Also updates the Organization if applicable
 */
let updateEvent = (args) => {
    return Event.findById(args.id)
        .then(originalResult => {
            let originalOrgId = (originalResult && originalResult._doc && originalResult._doc.organization) ? originalResult._doc.organization : null;

            return Event.updateOne({_id: args.id}, args.input)
                .then((updateResult) => {

                    // if organization is supplied, update the original and new Organizations
                    if (args.input.organization) {
                        helper.updateOrganizationEvent(originalOrgId, args.input.organization, args.id);
                    }

                    return Event.findById(args.id)
                        .populate('organization')
                        .then(findResult => {
                            return Object.assign({}, helper.transformResult(findResult), {
                                date: (findResult && findResult._doc && findResult._doc.date) ? findResult._doc.date.toISOString() : null
                            })
                        })
                        .catch(err => {
                            throw err;
                        });
                })
                .catch(err => {
                    throw err;
                });
        }).catch(findOriginalError => {
            throw findOriginalError;
        });

};

/**
 * Delete an Event by id
 */
let deleteEvent = (args) => {
    return Event.deleteOne({_id: args.id})
        .then((result) => {
            return (result && result.deletedCount) ? args.id : null;
        })
        .catch(err => {
            throw err;
        });
};


module.exports = {
    event: event,
    events: events,
    eventsIn: eventsIn,
    createEvent: createEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
};

