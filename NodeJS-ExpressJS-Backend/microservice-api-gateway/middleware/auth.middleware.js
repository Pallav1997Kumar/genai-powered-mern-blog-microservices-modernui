const jwt = require("jsonwebtoken");
const jwtPrivateKey = process.env.jwtPrivateKey;


module.exports = function(req,res,next){
    const token = req.cookies.jwt_access_token;

    if(!token){
        return res.status(401)
        .json("Not Authenticated");
    }

    jwt.verify(
        token,
        jwtPrivateKey,
        function(err,user){
            if(err){
                return res.status(401)
                .json("Invalid Token");
            }
            req.user = user;
            next();
        }
    );
};