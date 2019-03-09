const helper = require('../util/helper-util');
const objectCreator = require('../util/object-creator-util');
const Organization = require(`${__basedir}/models/Organization`);


/**
 * Find an Organization by id
 */
let organization = (args) => {
    return Organization
        .findById(args.id)
        .populate('events')
        .populate('locations')
        .then(result => {
            return helper.transformResult(result);
        })
        .catch(err => {
            throw err;
        });
};

/**
 * Find an Organization by name
 */
let organizations = (args) => {
    let queryObj = args && args.name ? {name: args.name} : null;
    return Organization
        .find(queryObj)
        .populate('events')
        .populate('locations')
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
 * Create a new Organization
 */
let createOrganization = (args) => {
    let organization = objectCreator.createOrganization(args);

    return organization
        .save()
        .then(result => {
            return helper.transformResult(result);
        })
        .catch(err => {
            throw err;
        });
};

/**
 * Update an Organization by id
 */
let updateOrganization = (args) => {
    return Organization.updateOne({_id: args.id}, args.input)
        .then((updateResult) => {
            return Organization
                .findById(args.id)
                .then(findResult => {
                    return helper.transformResult(findResult);
                })
                .catch(err => {
                    throw err;
                });
        })
        .catch(err => {
            throw err;
        });
};

/**
 * Delete an Organization by id
 */
let deleteOrganization = (args) => {
    return Organization.deleteOne({_id: args.id})
        .then((result) => {
            return (result && result.deletedCount) ? args.id : null;
        })
        .catch(err => {
            throw err;
        });
};



module.exports = {
    organization: organization,
    organizations: organizations,
    createOrganization: createOrganization,
    updateOrganization: updateOrganization,
    deleteOrganization: deleteOrganization
};