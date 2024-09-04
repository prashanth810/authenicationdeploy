const Joi = require("joi");

const signupvalidation = (req, resp, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return resp.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}

const loginvalidation = (req, resp, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return resp.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}

module.exports = ({
    signupvalidation,
    loginvalidation
})