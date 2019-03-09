const mongoose = require('mongoose');
const env = require(`${__basedir}/config/environment/env`);


module.exports = mongoose
    .connect(
        `mongodb+srv://${
            env.DATABASE_USER
        }:${
            env.DATABASE_PASS
        }@cluster0-gxuwl.mongodb.net/${
            env.DATABASE_NAME
        }?retryWrites=true`,
        { useNewUrlParser: true }
    )
    .then(() => console.log('DB connection successful'))
    .catch(err => console.log(err));