const jwt = require("jsonwebtoken");

const blogUserRepository = require("../repositories/blog-user.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "auth.service.js";

const JWT_SECRET = process.env.jwtPrivateKey;


// ============================================================
// Register User - starts
// ============================================================
async function registerUser(data){
    logger.info(`[${FILE_NAME}] Register user service started`);

    try {
        const firstName = data.firstName;
        const middleName = data.middleName;
        const lastName = data.lastName;
        const username = data.username;
        const gender = data.gender;
        const dob = data.dob;
        const email = data.email;
        const password = data.password;
        const confirmPassword = data.confirmPassword;

        logger.info(`[${FILE_NAME}] Checking whether username or email already exists`);
        const existingUser = 
            await blogUserRepository.findUserByUsernameOrEmail(username, email);

        if(existingUser){
            logger.warn(`[${FILE_NAME}] User registration failed because username or email already exists`);
            if(existingUser.username === username){
                logger.warn(`[${FILE_NAME}] User registration failed because username already exists`);
                throw new Error(
                    "Username already used. Please choose another username"
                );
            }

            logger.warn(`[${FILE_NAME}] User registration failed because email already exists`);
            throw new Error(
                "Email address already exists!"
            );
        }

        if(password !== confirmPassword){
            logger.warn(`[${FILE_NAME}] User registration failed because password and confirm password do not match`);
            throw new Error(
                "Password and Confirm Password does not match!"
            );
        }

        const fullName = middleName ?
        `${firstName} ${middleName} ${lastName}` :
        `${firstName} ${lastName}`;

        let profilePhoto;

        if(gender === "Male"){
            profilePhoto = "https://res.cloudinary.com/dgxqqp4rn/image/upload/v1761490143/uploads/profilePhotos/Male.png";
        }
        else{
            profilePhoto = "https://res.cloudinary.com/dgxqqp4rn/image/upload/v1761490344/uploads/profilePhotos/Female.jpg";
        }

        logger.info(`[${FILE_NAME}] Creating new user through repository`);
        const user = await blogUserRepository.createUser({
                firstName,
                middleName,
                lastName,
                fullName,
                username,
                emailAddress: email,
                gender,
                dateOfBirth: dob,
                password,
                userProfilePhoto: profilePhoto
            });

        logger.success(`[${FILE_NAME}] User registered successfully`);
        return "User has been created successfully";
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to register user`, error);
        throw error;
    }
}
// ============================================================
// Register User - ends
// ============================================================



// ============================================================
// Login User - starts
// ============================================================
async function loginUser(email,password){
    logger.info(`[${FILE_NAME}] Login user service started`);

    try {
        logger.info(`[${FILE_NAME}] Finding user by email`);
        const user = await blogUserRepository.findUserByEmail(email);

        if(!user){
            logger.warn(`[${FILE_NAME}] Login failed because email address was not found`);
            throw new Error(
                "Invalid Email Address"
            );
        }

        if(password !== user.password){
            logger.warn(`[${FILE_NAME}] Login failed because password is invalid`);
            throw new Error(
                "Invalid Password"
            );
        }

        logger.info(`[${FILE_NAME}] Generating authentication token`);

        const token = jwt.sign(
            {
                id:user._id
            },
            JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        logger.success(`[${FILE_NAME}] User logged in successfully`);

        return {
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            fullName: user.fullName,
            userID: user._id,
            username: user.username,
            emailAddress: user.emailAddress,
            gender: user.gender,
            profilePhoto: user.userProfilePhoto,
            jwtToken: token
        };
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to login user`, error);
        throw error;
    }
}
// ============================================================
// Login User - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    registerUser: registerUser,
    loginUser: loginUser
};
// ============================================================
// Service Exports - ends
// ============================================================