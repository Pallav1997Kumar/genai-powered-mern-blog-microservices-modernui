const dotenv = require("dotenv");

const BlogUser = require("../database-models/blog-user.model.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-user.repository.js";



// ============================================================
// Environment Configuration - starts
// ============================================================
const configPath =
    process.env.DEPLOYMENT_STRUCTURE ===
    "ALL_MICROSERVICES_ONE_DEPLOYMENT"
        ? "../config.env"
        : "./config.env";

dotenv.config({
    path: configPath
});
// ============================================================
// Environment Configuration - ends
// ============================================================



// ============================================================
// Find User By Username Or Email - starts
// ============================================================
async function findUserByUsernameOrEmail(username, email){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Finding user by username or email`);
    }

    try {
        const user = await BlogUser.findOne({
            $or:[
                {
                    username: username
                },
                {
                    emailAddress: email
                }
            ]
        });

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User lookup by username or email completed successfully`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to find user by username or email`, error);
        }
        throw error;
    }
}
// ============================================================
// Find User By Username Or Email - ends
// ============================================================



// ============================================================
// Find User By Email - starts
// ============================================================
async function findUserByEmail(email){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Finding user by email`);
    }

    try {
        const user = await BlogUser.findOne({
            emailAddress: email
        });

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User lookup by email completed successfully`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to find user by email`, error);
        }
        throw error;
    }
}
// ============================================================
// Find User By Email - ends
// ============================================================



// ============================================================
// Find User By ID - starts
// ============================================================
async function findUserById(id){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Finding user by ID`);
    }

    try {
        const user = await BlogUser.findById(id);
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User lookup by ID completed successfully`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to find user by ID`, error);
        }
        throw error;
    }
}
// ============================================================
// Find User By ID - ends
// ============================================================



// ============================================================
// Find User By Username - starts
// ============================================================
async function findUserByUsername(username){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Finding user by username`);
    }

    try {
        const user = await BlogUser.findOne({
            username: username
        })
        .select(
            "_id fullName username userProfilePhoto"
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User lookup by username completed successfully`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to find user by username`, error);
        }
        throw error;
    }
}
// ============================================================
// Find User By Username - ends
// ============================================================



// ============================================================
// Find Existing User By Username Or Email - starts
// ============================================================
async function findExistingUserByUsernameOrEmail(userID, username, email){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Finding existing user by username or email`);
    }

    try {
        const user = await BlogUser.findOne({
            _id:{
                $ne:userID
            },
            $or:[
                {
                    username: username
                },
                {
                    emailAddress: email
                }
            ]
        });

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Existing user lookup completed successfully`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to find existing user by username or email`, error);
        }
        throw error;
    }
}
// ============================================================
// Find Existing User By Username Or Email - ends
// ============================================================



// ============================================================
// Find User With Basic Information - starts
// ============================================================
async function findUserWithBasicInformation(
    userID,
    firstName,
    middleName,
    lastName,
    fullName,
    gender,
    dob
){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Checking user basic information`);
    }

    try {
        const user = await BlogUser.findOne({
            _id:userID,
            firstName:firstName,
            middleName:middleName,
            lastName:lastName,
            fullName:fullName,
            gender:gender,
            dateOfBirth:dob
        });

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User basic information lookup completed successfully`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to find user with basic information`, error);
        }
        throw error;
    }
}
// ============================================================
// Find User With Basic Information - ends
// ============================================================



// ============================================================
// Create User - starts
// ============================================================
async function createUser(data){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Creating new user`);
    }

    try {
        const user = await BlogUser.create(data);
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User created successfully`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to create user`, error);
        }
        throw error;
    }
}
// ============================================================
// Create User - ends
// ============================================================



// ============================================================
// Update User By ID - starts
// ============================================================
async function updateUserById(userID, data){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Updating user by ID`);
    }

    try {
        const user = await BlogUser.findByIdAndUpdate(
            userID,
            {
                $set:data
            }
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User updated successfully by ID`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user by ID`, error);
        }
        throw error;
    }
}
// ============================================================
// Update User By ID - ends
// ============================================================



// ============================================================
// Delete User By ID - starts
// ============================================================
async function deleteUserById(id){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Deleting user by ID`);
    }

    try {
        const user = await BlogUser.findByIdAndDelete(id);
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User deleted successfully by ID`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete user by ID`, error);
        }
        throw error;
    }
}
// ============================================================
// Delete User By ID - ends
// ============================================================



// ============================================================
// Find User Profile By ID - starts
// ============================================================
async function findUserProfileById(id){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Finding user public profile by ID`);
    }

    try {
        const user = await BlogUser.findById(id)
            .select("_id fullName username userProfilePhoto");

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User public profile fetched successfully by ID`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to find user public profile by ID`, error);
        }
        throw error;
    }
}
// ============================================================
// Find User Profile By ID - ends
// ============================================================



// ============================================================
// Find User Profile By Username - starts
// ============================================================
async function findUserProfileByUsername(username){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Finding user public profile by username`);
    }

    try {
        const user = await BlogUser.findOne({
            username: username
        })
        .select("_id fullName username userProfilePhoto");

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User public profile fetched successfully by username`);
        }
        return user;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to find user public profile by username`, error);
        }
        throw error;
    }
}
// ============================================================
// Find User Profile By Username - ends
// ============================================================



// ============================================================
// Find Blog Users By Name Ignore Case - starts
// ============================================================
async function findBlogUsersByNameIgnoreCase(blogUsersId, searchText) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Searching blog users by username or full name`);
    }

    try {
        const users = await BlogUser.find({
            _id: {
                $in: blogUsersId
            },
            $or: [
                {
                    username: {
                        $regex: searchText,
                        $options: "i"
                    }
                },
                {
                    fullName: {
                        $regex: searchText,
                        $options: "i"
                    }
                }
            ]
        })
        .limit(5)
        .select("_id username fullName");

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog user search completed successfully`);
        }
        return users;
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to search blog users by name`, error);
        }
        throw error;
    }
}
// ============================================================
// Find Blog Users By Name Ignore Case - ends
// ============================================================



// ============================================================
// Repository Exports - starts
// ============================================================
module.exports = {
    findUserByUsernameOrEmail,
    findUserByEmail,
    findUserById,
    findUserByUsername,
    findExistingUserByUsernameOrEmail,
    findUserWithBasicInformation,
    createUser,
    updateUserById,
    deleteUserById,
    findUserProfileById,
    findUserProfileByUsername,
    findBlogUsersByNameIgnoreCase
};
// ============================================================
// Repository Exports - ends
// ============================================================
