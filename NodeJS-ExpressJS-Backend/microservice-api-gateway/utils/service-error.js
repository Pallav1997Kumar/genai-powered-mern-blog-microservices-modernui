function createServiceError(errorMessage, error) {
    return {
        success: false,
        error: true,
        successMessage: "",
        errorMessage: errorMessage,
        errorData: error.response?.data || error.message,
        resultData: null,
        status: error.response?.status || 500
    };
}

module.exports = createServiceError;
