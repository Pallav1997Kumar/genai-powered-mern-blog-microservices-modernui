const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const blogPostCommentSchema = new Schema({

    commentDescription: {
        type: String,
        required: true
    },

    commentDateTime: {
        type: Date,
        required: true
    },

    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BlogUser"
    },

    postID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BlogPost"
    }

});



// ============================================================
// Indexes
// ============================================================
blogPostCommentSchema.index({
    userID: 1
});

blogPostCommentSchema.index({
    postID: 1
});

blogPostCommentSchema.index({
    commentDateTime: -1
});

blogPostCommentSchema.index({
    postID: 1,
    commentDateTime: -1
});



// ============================================================
// Model
// ============================================================
const BlogPostComment = mongoose.model(
    "BLOGPOSTCOMMENT",
    blogPostCommentSchema
);


module.exports = BlogPostComment;