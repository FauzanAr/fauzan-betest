const bcrypt = require('bcrypt');
const wrapper = require('./wrapper');
const logger = require('./logger');
const saltRound = 10;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);
        return wrapper.data(hash);
    } catch (error) {
        logger.error(`Error while hashing password: ${error}`);
        return wrapper.error('error while hashing password');
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return wrapper.data(isMatch);
      } catch (error) {
        logger.error(`Error while comparing password: ${error}`);
        return wrapper.error('error while comparing password');
      }
}

module.exports = {
    hashPassword,
    comparePassword,
}