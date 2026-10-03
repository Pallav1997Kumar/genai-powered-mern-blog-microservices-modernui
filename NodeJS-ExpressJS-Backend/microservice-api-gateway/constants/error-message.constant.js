class UserServiceErrorMessage {
    static USER_REGISTRATION_FAILED = "Failed to register user";
    static USER_LOGIN_FAILED = "Failed to login user";
    static USER_LOGOUT_FAILED = "Failed to logout user";
    static USER_ACCOUNT_DELETION_FAILED = "Failed to delete user account";

    static PROFILE_PHOTO_UPDATE_FAILED = "Failed to update profile photo";
    static BASIC_INFORMATION_UPDATE_FAILED = "Failed to update basic information";
    static EMAIL_USERNAME_UPDATE_FAILED = "Failed to update email or username";
    static PASSWORD_UPDATE_FAILED = "Failed to update password";

    static USER_FETCH_BY_ID_FAILED = "Failed to fetch user by ID";
    static USER_FETCH_BY_USERNAME_FAILED = "Failed to fetch user by username";
    static USER_SEARCH_FAILED = "Failed to search users";
}


class BlogCategoryServiceErrorMessage {
    static GET_ALL_CATEGORIES_FAILED = "Failed to fetch blog categories";
    static GET_CATEGORY_BY_ID_FAILED = "Failed to fetch category by ID";
    static GET_CATEGORY_BY_NAME_FAILED = "Failed to fetch category by name";
    static SEARCH_CATEGORIES_FAILED = "Failed to search blog categories";
}


class BlogCommentServiceErrorMessage {
    static ADD_COMMENT_FAILED = "Failed to add comment";
    static UPDATE_COMMENT_BY_ID_FAILED = "Failed to update comment by comment ID";
    static DELETE_COMMENT_BY_ID_FAILED = "Failed to delete comment by comment ID";
    static FETCH_COMMENTS_BY_POSTID_FAILED = "Failed to fetch comments by post ID";
    static DELETE_USER_COMMENTS_FAILED = "Failed to delete user's comments";
    static DELETE_POST_COMMENTS_FAILED = "Failed to delete post comments";
}


class BlogGenAIServiceErrorMessage {
    static GENERATE_BLOG_SUMMARY_FAILED = "Failed to generate blog summary";
    static GENERATE_BLOG_TLDR_FAILED = "Failed to generate blog TLDR";
    static GENERATE_BLOG_KEY_TAKEAWAYS_FAILED = "Failed to generate blog key takeaways";
    static GENERATE_BLOG_CONCLUSION_FAILED = "Failed to generate blog conclusion";
    static GENERATE_BLOG_FAQ_FAILED = "Failed to generate blog FAQ";
    static GENERATE_BLOG_HIGHLIGHTS_FAILED = "Failed to generate blog highlights";

    static SUGGEST_BLOG_TITLES_FAILED = "Failed to suggest blog titles";
    static GENERATE_BLOG_DESCRIPTION_FAILED = "Failed to generate blog description";
    static ENHANCE_BLOG_DESCRIPTION_FAILED = "Failed to enhance blog description";
}


class BlogPostLikeServiceErrorMessage {
    static LIKE_BLOG_POST_FAILED = "Failed to like blog post";
    static UNLIKE_BLOG_POST_FAILED = "Failed to unlike blog post";
    static FETCH_BLOG_POST_LIKES_FAILED = "Failed to fetch blog post likes";
    static DELETE_USER_LIKES_FAILED = "Failed to delete user likes";
    static DELETE_ALL_LIKES_FOR_POST_FAILED = "Failed to delete all likes for post";
}


class BlogPostServiceErrorMessage {
    static GET_FOUR_BLOG_POST_BY_CATEGORY_FAILED = "Failed to fetch four blog posts by category";
    static GET_CATEGORY_POST_PAGINATION_FAILED = "Failed to fetch category posts pagination";
    static GET_UNIQUE_CATEGORY_IDS_FAILED = "Failed to fetch unique category IDs";
    static GET_UNIQUE_USERS_BY_CATEGORY_FAILED = "Failed to fetch unique users by category";

    static FILTER_SORT_PAGINATION_FAILED = "Failed to filter and sort blog posts";
    static FILTER_SORT_PAGINATION_BY_USER_FAILED = "Failed to filter user blog posts";
    static FILTER_SORT_PAGINATION_BY_CATEGORY_FAILED = "Failed to filter category blog posts";

    static GET_ALL_BLOG_POSTS_FAILED = "Failed to fetch blog posts";
    static GET_FOUR_BLOG_POSTS_FAILED = "Failed to fetch blog posts";
    static GET_BLOG_POST_BY_ID_FAILED = "Failed to fetch blog post";
    static GET_BLOG_POST_PAGINATION_FAILED = "Failed to fetch blog post pagination";
    static SEARCH_BLOG_POST_BY_TITLE_FAILED = "Failed to search blog posts by title";

    static GET_ALL_BLOG_POST_IDS_BY_USER_ID_FAILED = "Failed to fetch all blog post IDs";
    static GET_USER_POST_PAGINATION_FAILED = "Failed to fetch user posts";
    static GET_UNIQUE_USER_IDS_FAILED = "Failed to fetch unique user IDs";
    static GET_UNIQUE_CATEGORIES_BY_USER_FAILED = "Failed to fetch user categories";

    static ADD_BLOG_POST_FAILED = "Failed to create blog post";
    static DELETE_BLOG_POST_FAILED = "Failed to delete blog post";
    static DELETE_BLOG_POSTS_BY_USER_FAILED = "Failed to delete user blog posts";
    static UPDATE_BLOG_POST_FAILED = "Failed to update blog post";
}



class ImageUploadServiceErrorMessage {
    static UPLOAD_BLOG_IMAGE_FAILED = "Failed to upload blog image";
    static UPLOAD_PROFILE_PHOTO_FAILED = "Failed to upload profile photo";
}



module.exports = {
    UserServiceErrorMessage,
    BlogCategoryServiceErrorMessage,
    BlogCommentServiceErrorMessage,
    BlogGenAIServiceErrorMessage,
    BlogPostLikeServiceErrorMessage,
    BlogPostServiceErrorMessage,
    ImageUploadServiceErrorMessage
};