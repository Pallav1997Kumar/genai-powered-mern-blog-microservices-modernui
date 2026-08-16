const httpClient = require("../utils/httpClient");

const {
    CLOUDINARY_SERVICE
} = require("../config/services.js");


// Upload Blog Image
const uploadBlogImage = async function(data){
    try{
        const response = await httpClient.post(
            `${CLOUDINARY_SERVICE}/api/image-upload/blogImage`,
            data
        );

        return response.data;
    }
    catch(error){
        throw {
            message:"Failed to upload blog image",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};


// Upload Profile Photo
const uploadProfilePhoto = async function(data){
    try{
        const response = await httpClient.post(
            `${CLOUDINARY_SERVICE}/api/image-upload/profilePhoto`,
            data
        );

        return response.data;
    }
    catch(error){
        throw {
            message:"Failed to upload profile photo",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};


module.exports = {
    uploadBlogImage,
    uploadProfilePhoto
};