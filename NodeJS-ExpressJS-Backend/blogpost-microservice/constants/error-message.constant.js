class ErrorMessage {
    static NOT_AUTHENTICATED = "Not Authenticated";
    static BLOG_POST_DATA_REQUIRED = "Blog post data is required";
    static BLOG_POST_TITLE_REQUIRED = "Blog post title is required";
    static BLOG_POST_DESCRIPTION_REQUIRED = "Blog post description is required";
    static BLOG_POST_CATEGORY_REQUIRED = "Blog post category is required";
    static BLOG_POST_IMAGE_REQUIRED = "Please upload the image";
    static INVALID_AUTHENTICATION_TOKEN = "Invalid authentication token";
    static POST_ID_REQUIRED = "Post ID is required";
    static POST_NOT_FOUND = "Post not found";
    static USER_ID_REQUIRED = "User ID is required";

    static FAILED_TO_FETCH_FOUR_CATEGORY_POSTS = "Failed to fetch four blog posts for particular category";
    static FAILED_TO_FETCH_CATEGORY_POSTS_PAGINATION = "Failed to fetch blog posts for particular category with pagination";
    static FAILED_TO_FETCH_UNIQUE_CATEGORY_IDS = "Failed to fetch unique blog posted category IDs";
    static FAILED_TO_FETCH_UNIQUE_CATEGORY_USERS = "Failed to fetch unique blog posted users for particular category";
    static FAILED_TO_FETCH_FILTER_SORT_PAGINATION = "Failed to fetch blog post details with filter sort and pagination";
    static FAILED_TO_FETCH_USER_FILTER_SORT_PAGINATION = "Failed to fetch filtered and sorted blog posts for particular user";
    static FAILED_TO_FETCH_CATEGORY_FILTER_SORT_PAGINATION = "Failed to fetch filtered and sorted blog posts for particular category";
    static FAILED_TO_FETCH_ALL_BLOG_POSTS = "Failed to fetch all blog posts";
    static FAILED_TO_FETCH_FOUR_BLOG_POSTS = "Failed to fetch four blog posts";
    static FAILED_TO_FETCH_BLOG_POST = "Failed to fetch particular blog post";
    static FAILED_TO_SEARCH_BLOG_POSTS_BY_TITLE = "Failed to search blog posts by title";
    static FAILED_TO_FETCH_BLOG_POSTS_PAGINATION = "Failed to fetch blog posts with pagination";
    static FAILED_TO_FETCH_USER_BLOG_POST_IDS = "Failed to fetch all blog post IDs for user";
    static FAILED_TO_FETCH_USER_BLOG_POSTS = "Failed to fetch blog posts for particular user";
    static FAILED_TO_FETCH_UNIQUE_BLOG_USER_IDS = "Failed to fetch unique blog posted user IDs";
    static FAILED_TO_FETCH_USER_CATEGORIES = "Failed to fetch unique categories for particular user";
    static FAILED_TO_ADD_BLOG_POST = "Failed to add new blog post";
    static FAILED_TO_DELETE_BLOG_POST = "Failed to delete blog post";
    static FAILED_TO_UPDATE_BLOG_POST = "Failed to update blog post";
    static FAILED_TO_DELETE_USER_BLOG_POSTS = "Failed to delete blog posts by user";
}


module.exports = ErrorMessage;