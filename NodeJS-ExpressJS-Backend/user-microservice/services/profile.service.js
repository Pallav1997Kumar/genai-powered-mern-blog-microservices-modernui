const blogUserRepository = require("../repositories/blog-user.repository.js");
const ErrorMessage = require("../constants/error-message.constant.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "profile.service.js";



// ============================================================
// Update Profile Photo - starts
// ============================================================
async function updateUserProfilePhoto(userID, imageDetail){
    devLogger.info(`[${FILE_NAME}] Update user profile photo service started`);

    try {
        devLogger.info(`[${FILE_NAME}] Finding user by ID`);
        const user = await blogUserRepository.findUserById(userID);

        if (!user) {
            devLogger.warn(`[${FILE_NAME}] User not found for profile photo update`);
            throw {
                status:404,
                message:ErrorMessage.USER_NOT_FOUND
            };
        }

        devLogger.info(`[${FILE_NAME}] Updating user profile photo through repository`);

        await blogUserRepository.updateUserById(
            userID,
            {
                userProfilePhoto:imageDetail.file.path
            }
        );

        devLogger.success(`[${FILE_NAME}] User profile photo updated successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update user profile photo`, error);
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
    devLogger.info(`[${FILE_NAME}] Update user basic information service started`);

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

        devLogger.info(`[${FILE_NAME}] Checking whether basic information has changed`);

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
            devLogger.warn(`[${FILE_NAME}] User basic information has not changed`);
            throw {
                status:417,
                message:ErrorMessage.NO_INFORMATION_UPDATED
            };
        }

        devLogger.info(`[${FILE_NAME}] Updating user basic information through repository`);

        await blogUserRepository.updateUserById(
            userID,
            {
                firstName,
                middleName,
                lastName,
                fullName,
                gender,
                dateOfBirth:dob
            }
        );

        devLogger.success(`[${FILE_NAME}] User basic information updated successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update user basic information`, error);
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
    devLogger.info(`[${FILE_NAME}] Update user email and username service started`);

    try {
        const username = data.username;
        const email = data.email;

        devLogger.info(`[${FILE_NAME}] Finding user by ID`);

        const user = await blogUserRepository.findUserById(userID);

        if (!user) {
            devLogger.warn(`[${FILE_NAME}] User not found for email and username update`);
            throw {
                status:404,
                message:ErrorMessage.USER_NOT_FOUND
            };
        }

        if(user.username === username && user.emailAddress === email){
            devLogger.warn(`[${FILE_NAME}] User email and username have not changed`);
            throw {
                status:417,
                message:ErrorMessage.NO_INFORMATION_UPDATED
            };
        }

        devLogger.info(`[${FILE_NAME}] Checking whether username or email is already in use`);

        const existingUser =
            await blogUserRepository.findExistingUserByUsernameOrEmail(
                userID,
                username,
                email
            );

        if(existingUser){
            devLogger.warn(`[${FILE_NAME}] Username or email already exists`);
            if(existingUser.username === username){
                devLogger.warn(`[${FILE_NAME}] Username exists`);
                throw {
                    status:409,
                    message:ErrorMessage.USERNAME_ALREADY_USED
                };
            }

            if(existingUser.emailAddress === email){
                devLogger.warn(`[${FILE_NAME}] Email already exists`);
                throw {
                    status:409,
                    message:ErrorMessage.EMAIL_ALREADY_EXISTS
                };
            }
        }

        devLogger.info(`[${FILE_NAME}] Updating user email and username through repository`);

        await blogUserRepository.updateUserById(
            userID,
            {
                username,
                emailAddress:email
            }
        );

        devLogger.success(`[${FILE_NAME}] User email and username updated successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update user email and username`, error);
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
    devLogger.info(`[${FILE_NAME}] Update user password service started`);

    try {
        const oldPassword = data.oldPassword;
        const newPassword = data.newPassword;
        const confirmNewPassword = data.confirmNewPassword;

        devLogger.info(`[${FILE_NAME}] Finding user by ID`);

        const user = await blogUserRepository.findUserById(userID);

        if (!user) {
            devLogger.warn(`[${FILE_NAME}] User not found for password update`);
            throw {
                status:404,
                message:ErrorMessage.USER_NOT_FOUND
            };
        }

        if(user.password !== oldPassword){
            devLogger.warn(`[${FILE_NAME}] Password update failed because old password is incorrect`);
            throw {
                status:401,
                message:ErrorMessage.INCORRECT_OLD_PASSWORD
            };
        }

        if(newPassword !== confirmNewPassword){
            devLogger.warn(`[${FILE_NAME}] Password update failed because new password and confirm new password do not match`);
            throw {
                status:401,
                message:ErrorMessage.NEW_PASSWORD_CONFIRMATION_MISMATCH
            };
        }

        if(newPassword === user.password){
            devLogger.warn(`[${FILE_NAME}] Password update failed because new password is same as old password`);
            throw {
                status:401,
                message:ErrorMessage.NEW_PASSWORD_MATCHES_OLD_PASSWORD
            };
        }

        devLogger.info(`[${FILE_NAME}] Updating user password through repository`);

        await blogUserRepository.updateUserById(
            userID,
            {
                password:newPassword
            }
        );

        devLogger.success(`[${FILE_NAME}] User password updated successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update user password`, error);
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
    updateUserProfilePhoto:updateUserProfilePhoto,
    updateUserBasicInformation:updateUserBasicInformation,
    updateUserEmailUsername:updateUserEmailUsername,
    updateUserPassword:updateUserPassword
};
// ============================================================
// Service Exports - ends
// ============================================================