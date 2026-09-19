const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const blogUserRepository = require("../repositories/blog-user.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "profile.service.js";



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
// Update Profile Photo - starts
// ============================================================
async function updateUserProfilePhoto(userID, imageDetail){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update user profile photo service started`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Finding user by ID`);
        }
        const user = await blogUserRepository.findUserById(userID);

        if (!user) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] User not found for profile photo update`);
            }
            throw {
                status: 404,
                message: "User not found"
            };
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Updating user profile photo through repository`);
        }
        await blogUserRepository.updateUserById(
            userID,
            {
                userProfilePhoto:imageDetail.file.path
            }
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User profile photo updated successfully`);
        }
        return "Your Profile Photo is updated successfully";
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user profile photo`, error);
        }
        throw error;
    }
};
// ============================================================
// Update Profile Photo - ends
// ============================================================



// ============================================================
// Update Basic Information - starts
// ============================================================
async function updateUserBasicInformation(userID,data){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update user basic information service started`);
    }

    try {
        const firstName = data.firstName;
        const middleName = data.middleName;
        const lastName = data.lastName;
        const gender = data.gender;
        const dob = data.dob;

        let fullName;

        if(
            middleName === "" ||
            middleName === null ||
            middleName === undefined
        ){
            fullName = firstName + " " + lastName;
        }
        else{
            fullName = firstName + " " + middleName + " " + lastName;
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Checking whether basic information has changed`);
        }

        const user = 
            await blogUserRepository.findUserWithBasicInformation(
                userID,
                firstName,
                middleName,
                lastName,
                fullName,
                gender,
                dob
            );

        if(user){
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] User basic information has not changed`);
            }
            throw {
                status:417,
                message:"You have not updated any information"
            };
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Updating user basic information through repository`);
        }

        await blogUserRepository.updateUserById(
            userID,
            {
                firstName,
                middleName,
                lastName,
                fullName,
                gender,
                dateOfBirth: dob
            }
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User basic information updated successfully`);
        }
        return "Your Basic Information is updated successfully";
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user basic information`, error);
        }
        throw error;
    }
};
// ============================================================
// Update Basic Information - ends
// ============================================================



// ============================================================
// Update Email Username - starts
// ============================================================
async function updateUserEmailUsername(userID,data){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update user email and username service started`);
    }

    try {
        const username = data.username;
        const email = data.email;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Finding user by ID`);
        }

        const user = await blogUserRepository.findUserById(userID);

        if (!user) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] User not found for email and username update`);
            }
            throw {
                status: 404,
                message: "User not found"
            };
        }

        if(user.username === username && user.emailAddress === email){
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] User email and username have not changed`);
            }
            throw {
                status:417,
                message:"You have not updated any information"
            };
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Checking whether username or email is already in use`);
        }

        const existingUser = 
            await blogUserRepository.findExistingUserByUsernameOrEmail(userID, username, email);

        if(existingUser){
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Username or email already exists`);
            }

            if(existingUser.username === username){
                if(process.env.environment == "DEVELOPMENT"){
                    logger.warn(`[${FILE_NAME}] Username exists`);
                }
                throw {
                    status:409,
                    message:"Username already used. Please choose another username"
                };
            }

            if (existingUser.emailAddress === email){
                if(process.env.environment == "DEVELOPMENT"){
                    logger.warn(`[${FILE_NAME}] Email already exists`);
                }
                throw {
                    status:409,
                    message:"Email address already exists!"
                };
            }
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Updating user email and username through repository`);
        }

        await blogUserRepository.updateUserById(
            userID,
            {
                username,
                emailAddress: email
            }
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User email and username updated successfully`);
        }
        return "Your Email Address and Username is updated successfully";
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user email and username`, error);
        }
        throw error;
    }
};
// ============================================================
// Update Email Username - ends
// ============================================================



// ============================================================
// Update Password - starts
// ============================================================
async function updateUserPassword(userID,data){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update user password service started`);
    }

    try {
        const oldPassword = data.oldPassword;
        const newPassword = data.newPassword;
        const confirmNewPassword = data.confirmNewPassword;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Finding user by ID`);
        }
        const user = await blogUserRepository.findUserById(userID);
        
        if (!user) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] User not found for password update`);
            }
            throw {
                status: 404,
                message: "User not found"
            };
        }

        if(user.password !== oldPassword){
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Password update failed because old password is incorrect`);
            }
            throw {
                status:401,
                message:"You have entered wrong old password"
            };
        }

        if(newPassword !== confirmNewPassword){
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Password update failed because new password and confirm new password do not match`);
            }
            throw {
                status:401,
                message:"New Password and Confirm New Password does not match!"
            };
        }

        if(newPassword === user.password){
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Password update failed because new password is same as old password`);
            }
            throw {
                status:401,
                message:"New Password cannot be same as Old Password"
            };
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Updating user password through repository`);
        }

        await blogUserRepository.updateUserById(
            userID,
            {
                password:newPassword
            }
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User password updated successfully`);
        }
        return "Password has been updated successfully";
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user password`, error);
        }
        throw error;
    }
};
// ============================================================
// Update Password - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    updateUserProfilePhoto: updateUserProfilePhoto,
    updateUserBasicInformation:updateUserBasicInformation,
    updateUserEmailUsername:updateUserEmailUsername,
    updateUserPassword:updateUserPassword
};
// ============================================================
// Service Exports - ends
// ============================================================
