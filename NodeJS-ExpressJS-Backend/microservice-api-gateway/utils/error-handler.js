function handleError(res, error) {
    if(error?.status) {
        return res.status(error.status).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.errorMessage || "Internal Server Error",
            errorData: error.errorData || null,
            resultData: null
        });
    }

    if(error?.response) {
        return res.status(error.response.status || 500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.response.data?.errorMessage || error.response.data?.message || "Internal Server Error",
            errorData: error.response.data || null,
            resultData: null
        });
    }

    return res.status(500).json({
        success: false,
        error: true,
        successMessage: "",
        errorMessage: "Internal Server Error",
        errorData: error?.message || null,
        resultData: null
    });
}

module.exports = handleError;