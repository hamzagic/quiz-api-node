const crypto = require('crypto');

const createVerifyToken = () => {
    return crypto.randomBytes(64).toString('hex');
}

module.exports = { createVerifyToken };