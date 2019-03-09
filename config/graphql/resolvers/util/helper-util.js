const Organization = require(`${__basedir}/models/Organization`);

/**
 *  Swap EventId on Organizations when an Event gets its organizationId updated
 */
let updateOrganizationEvent = (originalOrgId, newOrgId, eventId) => {
    return Organization.findOneAndUpdate({_id: originalOrgId}, {$pull: {events: eventId}})
        .then(originalResult => {
            return Organization.findOneAndUpdate({_id: newOrgId}, {$push: {events: eventId}})
                .then(newResult => {
                    return newResult;
                })
                .catch(newErr => {
                    throw newErr;
                });
        })
        .catch(originalError => {
            throw originalError;
        });
};

/**
 *  Swap LocationId on Organizations when a Location gets its organizationId updated
 */
let updateOrganizationLocation = (originalOrgId, newOrgId, locationId) => {
    return Organization.findOneAndUpdate({_id: originalOrgId}, {$pull: {locations: locationId}})
        .then(originalResult => {
            return Organization.findOneAndUpdate({_id: newOrgId}, {$push: {locations: locationId}})
                .then(newResult => {
                    return newResult;
                })
                .catch(newErr => {
                    throw newErr;
                });
        })
        .catch(originalError => {
            throw originalError;
        });
};

let transformResult = (result) => {
    return (result && result._doc) ? Object.assign({}, result._doc, {
        _id: result.id,
        createdAt: result._doc.createdAt ? new Date(result._doc.createdAt).toISOString() : null,
        updatedAt: result._doc.updatedAt ? new Date(result._doc.updatedAt).toISOString() : null
    }) : null;
};

let getDateFromInput = (dateStr) => {
    try {
        return new Date(dateStr);
    } catch (e) {
        throw e;
    }
};



module.exports = {
    transformResult: transformResult,
    getDateFromInput:getDateFromInput,
    updateOrganizationEvent: updateOrganizationEvent,
    updateOrganizationLocation: updateOrganizationLocation
};