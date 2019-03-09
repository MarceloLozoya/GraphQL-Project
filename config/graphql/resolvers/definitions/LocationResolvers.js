const env = require(`${__basedir}/config/environment/env`);

const googlePlaces = require('googleplaces')(env.GOOGLE_PLACES_API_KEY, env.GOOGLE_PLACES_OUTPUT_FORMAT);

const helper = require('../util/helper-util');
const Location = require(`${__basedir}/models/Location`);
const objectCreator = require('../util/object-creator-util');

/**
 * Find a Location by id
 */
let location = (args) => {
    return Location
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
 * Find a Location by name
 */
let locations = (args) => {
    let queryObj = args && args.name ? {name: args.name} : null;

    return Location
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
 * Find Locations given a list of ids
 */
let locationsIn = (args) => {
    return Location
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
 * Create a new Location
 */
let createLocation = (args) => {

    let saveLocation = (locationToSave) => {
        return locationToSave
            .save()
            .then(result => {
                return result.populate('organization')
                    .execPopulate()
                    .then(populateResult => {

                        if (args && args.input && args.input.organization) {
                            helper.updateOrganizationLocation(null, args.input.organization, populateResult.id);
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

    // check whether or not to call the Google Places api
    if (args && args.input && args.input.address) {

        return new Promise((resolve, reject) => {
            googlePlaces.textSearch({ query: args.input.address }, function (err, response) {
                resolve(response);
            });
        }).then(response => {
            let validResultExists = (response && response.results && Array.isArray(response.results) && response.results.length > 0 && response.results[0].geometry && response.results[0].geometry.location);

            if (validResultExists) {
                args.input.latitude = `${response.results[0].geometry.location.lat}`;
                args.input.longitude = `${response.results[0].geometry.location.lng}`;
            }

            return saveLocation(objectCreator.createLocation(args));
        });
    } else {
        return saveLocation(objectCreator.createLocation(args));
    }
};

/**
 * Update a Location by id. Also updates the Organization if applicable
 */
let updateLocation = (args) => {
    return Location.findById(args.id)
        .then(originalResult => {
            let originalOrgId = (originalResult && originalResult._doc && originalResult._doc.organization) ? originalResult._doc.organization : null;

            return Location.updateOne({_id: args.id}, args.input)
                .then((updateResult) => {

                    // if organization is supplied, update the original and new Organizations
                    if (args.input.organization) {
                        helper.updateOrganizationLocation(originalOrgId, args.input.organization, args.id);
                    }

                    return Location
                        .findById(args.id)
                        .populate('organization')
                        .then(findResult => {
                            return Object.assign({}, helper.transformResult(findResult))
                        })
                        .catch(err => {
                            throw err;
                        });
                })
                .catch(err => {
                    throw err;
                });
        })
        .catch(findOriginalError => {
            throw findOriginalError;
        });

};

/**
 * Delete a Location by id
 */
let deleteLocation = (args) => {
    return Location.deleteOne({_id: args.id})
        .then((result) => {
            return (result && result.deletedCount) ? args.id : null;
        })
        .catch(err => {
            throw err;
        });
};


module.exports = {
    location: location,
    locations: locations,
    locationsIn: locationsIn,
    createLocation: createLocation,
    updateLocation: updateLocation,
    deleteLocation: deleteLocation
};