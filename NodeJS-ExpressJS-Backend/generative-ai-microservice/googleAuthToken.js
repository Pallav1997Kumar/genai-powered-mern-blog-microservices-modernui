const dotenv = require("dotenv");
const { GoogleAuth } = require('google-auth-library');

const configPath =
    process.env.DEPLOYMENT_STRUCTURE ===
    "ALL_MICROSERVICES_ONE_DEPLOYMENT"
        ? "../config.env"
        : "./config.env";

dotenv.config({
    path: configPath
});



const serviceAccountJson = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

const googleAuthClient = new GoogleAuth({
    credentials: serviceAccountJson,
    scopes: 'https://www.googleapis.com/auth/generative-language'
    //scopes: 'https://www.googleapis.com/auth/cloud-platform'
});


async function generateAccessToken() {
    try {
        const authClient = await googleAuthClient.getClient();
        const tokenResponse = await authClient.getAccessToken();
        return tokenResponse.token;
    } 
    catch (error) {
        console.error('Error generating access token:', error);
        throw error;
    }
}


module.exports = { generateAccessToken };