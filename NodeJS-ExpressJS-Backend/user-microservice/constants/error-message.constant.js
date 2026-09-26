class ErrorMessage {
    static USERNAME_ALREADY_USED = "Username already used. Please choose another username";
    static EMAIL_ALREADY_EXISTS = "Email address already exists!";
    static PASSWORD_CONFIRMATION_MISMATCH = "Password and Confirm Password does not match!";
    static INVALID_EMAIL_ADDRESS = "Invalid Email Address";
    static INVALID_PASSWORD = "Invalid Password";
    static USER_NOT_FOUND = "User not found";
    static NO_INFORMATION_UPDATED = "You have not updated any information";
    static INCORRECT_OLD_PASSWORD = "You have entered wrong old password";
    static NEW_PASSWORD_CONFIRMATION_MISMATCH = "New Password and Confirm New Password does not match!";
    static NEW_PASSWORD_MATCHES_OLD_PASSWORD = "New Password cannot be same as Old Password";
    static INTERNAL_SERVER_ERROR = "Internal Server Error";
    static FAILED_TO_FETCH_USER_BY_ID = "Failed to fetch user by ID";
    static FAILED_TO_FETCH_USER_BY_USERNAME = "Failed to fetch user by username";
    static FAILED_TO_DELETE_USER = "Failed to delete user";
    static FAILED_TO_SEARCH_BLOG_USER = "Failed to search blog user";
}


module.exports = ErrorMessage;