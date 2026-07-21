function asyncHandler(fn) {
    // Bahar wala function
    return function(req, res, next) {
        // Andar wala function
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}

module.exports = asyncHandler