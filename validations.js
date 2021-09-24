const joi = require('joi')

const registerValidation = (data) => {
    const userSchemaValidation = joi.object({
        name:joi.string().min(6).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    })
    return userSchemaValidation.validate(data)
}

const loginValidation = (data) => {
    const userSchemaValidation = joi.object({
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    })
    return userSchemaValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation