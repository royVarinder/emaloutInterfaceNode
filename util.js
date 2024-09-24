const apiResponse = (code, message, data = []) => {
    try {
        const responseMessage = {}
        responseMessage.success = code
        responseMessage.message = message
        responseMessage.data = data
        return responseMessage;
    } catch (error) {
        console.error(error);
        return { returnCode: false, message: error.message, data: [] }
    }

}

module.exports = {
    apiResponse
}