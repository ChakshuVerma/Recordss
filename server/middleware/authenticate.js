const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try {
        // Retrieve token from cookie
        const token = req.cookies.jwtoken;
        // If token is not present
        if(token === "undefined"){
            res.status(401).json({error: "Token not found"});
        }
        // decode the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // find user using the payload of the cookie(_id here)
        const rootUser = await User.findOne({_id: decoded});

        // If user not found
        if(!rootUser){
            res.status(401).json({error: 'User not found'});
        }

        // User found 
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } 
    catch (error) {
        res.status(401).json({error: 'Unauthorized'});
        console.log('Error while authenticating: '+error); 
    }
}

module.exports = authenticate;