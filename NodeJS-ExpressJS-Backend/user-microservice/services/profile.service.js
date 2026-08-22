const blogUserRepository = require("../repositories/blog-user.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "profile.service.js";



// ============================================================
// Update Profile Photo - starts
// ============================================================
const updateUserProfilePhoto = async function(userID,imageDetail){
    logger.info(`[${FILE_NAME}] Update user profile photo service started`);

    try {
        logger.info(`[${FILE_NAME}] Finding user by ID`);
        const user = await blogUserRepository.findUserById(userID);

        if (!user) {
            logger.warn(`[${FILE_NAME}] User not found for profile photo update`);
            throw {
                status: 404,
                message: "User not found"
            };
        }

        logger.info(`[${FILE_NAME}] Updating user profile photo through repository`);
        await blogUserRepository.updateUserById(
            userID,
            {
                userProfilePhoto:imageDetail.file.path
            }
        );

        logger.success(`[${FILE_NAME}] User profile photo updated successfully`);
        return "Your Profile Photo is updated successfully";
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to update user profile photo`, error);
        throw error;
    }
};
// ============================================================
// Update Profile Photo - ends
// ============================================================



// ============================================================
// Update Basic Information - starts
// ============================================================
const updateUserBasicInformation = async function(userID,data){
    logger.info(`[${FILE_NAME}] Update user basic information service started`);

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

        logger.info(`[${FILE_NAME}] Checking whether basic information has changed`);

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
            logger.warn(`[${FILE_NAME}] User basic information has not changed`);
            throw {
                status:417,
                message:"You have not updated any information"
            };
        }

        logger.info(`[${FILE_NAME}] Updating user basic information through repository`);

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

        logger.success(`[${FILE_NAME}] User basic information updated successfully`);
        return "Your Basic Information is updated successfully";
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to update user basic information`, error);
        throw error;
    }
};
// ============================================================
// Update Basic Information - ends
// ============================================================



// ============================================================
// Update Email Username - starts
// ============================================================
const updateUserEmailUsername = async function(userID,data){
    logger.info(`[${FILE_NAME}] Update user email and username service started`);

    try {
        const username = data.username;
        const email = data.email;

        logger.info(`[${FILE_NAME}] Finding user by ID`);

        const user = await blogUserRepository.findUserById(userID);

        if (!user) {
            logger.warn(`[${FILE_NAME}] User not found for email and username update`);
            throw {
                status: 404,
                message: "User not found"
            };
        }

        if(user.username === username && user.emailAddress === email){
            logger.warn(`[${FILE_NAME}] User email and username have not changed`);
            throw {
                status:417,
                message:"You have not updated any information"
            };
        }

        logger.info(`[${FILE_NAME}] Checking whether username or email is already in use`);

        const existingUser = 
            await blogUserRepository.findExistingUserByUsernameOrEmail(userID, username, email);

        if(existingUser){
            logger.warn(`[${FILE_NAME}] Username or email already exists`);

            if(existingUser.username === username){
                logger.warn(`[${FILE_NAME}] Username exists`);
                throw {
                    status:409,
                    message:"Username already used. Please choose another username"
                };
            }

            if (existingUser.emailAddress === email){
                logger.warn(`[${FILE_NAME}] Email already exists`);
                throw {
                    status:409,
                    message:"Email address already exists!"
                };
            }
        }

        logger.info(`[${FILE_NAME}] Updating user email and username through repository`);

        await blogUserRepository.updateUserById(
            userID,
            {
                username,
                emailAddress: email
            }
        );

        logger.success(`[${FILE_NAME}] User email and username updated successfully`);
        return "Your Email Address and Username is updated successfully";
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to update user email and username`, error);
        throw error;
    }
};
// ============================================================
// Update Email Username - ends
// ============================================================



// ============================================================
// Update Password - starts
// ============================================================
const updateUserPassword = async function(userID,data){
    logger.info(`[${FILE_NAME}] Update user password service started`);

    try {
        const oldPassword = data.oldPassword;
        const newPassword = data.newPassword;
        const confirmNewPassword = data.confirmNewPassword;

        logger.info(`[${FILE_NAME}] Finding user by ID`);
        const user = await blogUserRepository.findUserById(userID);
        
        if (!user) {
            logger.warn(`[${FILE_NAME}] User not found for password update`);
            throw {
                status: 404,
                message: "User not found"
            };
        }

        if(user.password !== oldPassword){
            logger.warn(`[${FILE_NAME}] Password update failed because old password is incorrect`);
            throw {
                status:401,
                message:"You have entered wrong old password"
            };
        }

        if(newPassword !== confirmNewPassword){
            logger.warn(`[${FILE_NAME}] Password update failed because new password and confirm new password do not match`);
            throw {
                status:401,
                message:"New Password and Confirm New Password does not match!"
            };
        }

        if(newPassword === user.password){
            logger.warn(`[${FILE_NAME}] Password update failed because new password is same as old password`);
            throw {
                status:401,
                message:"New Password cannot be same as Old Password"
            };
        }

        logger.info(`[${FILE_NAME}] Updating user password through repository`);

        await blogUserRepository.updateUserById(
            userID,
            {
                password:newPassword
            }
        );

        logger.success(`[${FILE_NAME}] User password updated successfully`);
        return "Password has been updated successfully";
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to update user password`, error);
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