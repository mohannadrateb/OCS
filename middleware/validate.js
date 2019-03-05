const Joi = require('joi');

const validate = (Schema) => {
    return function (req, res, next) {
        const validation = Joi.validate(req.body, Schema,{abortEarly: false});
        if (validation.error) {
            var errors=[];
            validation.error.details.forEach(elem=>{
                errors.push({
                    path : elem.path[0],
                    message : elem.message
                });
            }) ;
            res.status(400).send({errors});
        } else {
            next();
        }
    }
}

module.exports = validate;