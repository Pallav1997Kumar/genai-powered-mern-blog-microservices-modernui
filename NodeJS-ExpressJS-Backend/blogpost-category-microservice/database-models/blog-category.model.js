const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const blogCategorySchema = new Schema({

    categoryName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    categoryDescription: {
        type: String,
        required: true
    }

});



// ============================================================
// Indexes
// ============================================================
blogCategorySchema.index({
    categoryName: 1
});



// ============================================================
// Model
// ============================================================
const BlogCategory = mongoose.model(
    "BLOGCATEGORY",
    blogCategorySchema
);


module.exports = BlogCategory;