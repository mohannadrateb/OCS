module.exports = function(req,res,next){
    console.log(req.user);
    if(req.user.isAdmin===true){
        return next();
    }
    else{
        return res.status(403).send();
    }
}