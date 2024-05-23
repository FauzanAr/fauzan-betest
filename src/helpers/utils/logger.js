const info = (message) => {
    return console.info(`[INFO]${message}`);
}

const error = (message) => {
    return console.error(`[ERROR]${message}`);
}

module.exports = {
    info,
    error,
}