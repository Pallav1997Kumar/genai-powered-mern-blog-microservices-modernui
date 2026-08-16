function handleError(res, error){
    if(error.status){
        return res.status(error.status).json(
            error.data.message
        );
    }

    if(error.response){
        return res.status(error.response.status).json(
            error.response.data
        );
    }

    return res.status(500).json({
        message:"Internal Server Error"
    });
}


module.exports = handleError;