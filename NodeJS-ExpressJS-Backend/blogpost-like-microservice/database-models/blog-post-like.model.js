const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const blogPostLikeSchema = new Schema({

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
blogPostLikeSchema.index({
    userID: 1
});

blogPostLikeSchema.index({
    postID: 1
});

blogPostLikeSchema.index({
    userID: 1,
    postID: 1
});



// ============================================================
// Model
// ============================================================
const BlogPostLike = mongoose.model(
    "BLOGPOSTLIKE",
    blogPostLikeSchema
);


module.exports = BlogPostLike;