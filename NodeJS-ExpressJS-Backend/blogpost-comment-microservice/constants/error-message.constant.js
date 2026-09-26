class ErrorMessage {
    static NOT_AUTHENTICATED = "Not Authenticated";
    static POST_ID_REQUIRED = "Post ID is required";
    static COMMENT_ID_REQUIRED = "Comment ID is required";
    static BLANK_COMMENT = "Blank comment cannot be added.";
    static INVALID_AUTHENTICATION_TOKEN = "Invalid authentication token";
    static USER_ID_REQUIRED = "User ID is required";
    static COMMENT_UPDATE_UNAUTHORIZED = "You are not authorized to update this comment";
}


module.exports = ErrorMessage;