/**
 * @param res The response object of current http request
 * @param statusCode The status code of current http request
 * @param data The response data of current http request
 * @param error The error object of current http request
 */
exports.sendResponse = (res, statusCode = 200, data = null, error = null) => {
    const response = {
        data: data,
        error: error
    };
    res.status(statusCode).send(response);
}