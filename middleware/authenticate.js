const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Keys = require("../config/keys");


module.exports = (req,res,next) => {

    var token = req.header('Authorization') || req.cookies.auth;
    var refreshToken = req.header('X-Refresh-Token') || req.cookies.refresh;
    
    

    if (!token || !refreshToken) {
        res.status(401).send({
            message: 'Unauthenticated'
        });
    }

    var tokenAfterSplit = token.split(" ");
    var tokenValue = tokenAfterSplit[1];
    
    if (tokenAfterSplit.length != 2 || tokenAfterSplit[0] != "Bearer") 
    res.status(401).send();

    jwt.verify(tokenValue, Keys.jwtAuthKey, (error, decoded) =>{

        if(!error){
           
            user.findById(decoded._id)
            .then((user)=>{  
                if (!user) {
                    return res.status(401).send();
                } 
                req.user = user;
                req.token = tokenValue;
                next();
            })
            .catch((err) => {
                res.status(401).send({
                    message: 'Unauthenticated'
                });
            });
        }


        else{
            console.log("da5al hena");
            jwt.verify(refreshToken, Keys.jwtRefreshKey, (error, decodedRefresh)=>{
                if(error){
                    return res.status(401).send({
                        message: 'Unauthenticated'
                    })
                }
                var token = "";
                user.findById(decodedRefresh._id )
                .then((user)=>{
                    if (!user) {
                        return Promise.reject()
                    }
                    req.user = user;
                    return user.removeToken(refreshToken);
                })
                .then(()=>{
                    return req.user.generateAuthToken();
                })
                .then((userAndToken)=>{
                    token = userAndToken.token;
                    return req.user.generateRefreshToken();    
                })
                .then((refreshToken)=>{
                    res.header('Authorization', `Bearer ${token}`)
                    .header('X-Refresh-Token', refreshToken)

                    .cookie('auth', `Bearer ${token}`, {
                            httpOnly: true
                        })
                    .cookie('refresh', refreshToken, {
                            httpOnly: true
                        });
                    next();
                })
                .catch((err) => {
                    res.status(401).send({
                        message: 'Unauthenticated'
                    });
            });
        });
    }
});

    

}
