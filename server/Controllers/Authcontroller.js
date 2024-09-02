const Usermodel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwttoken = require("jsonwebtoken")

// signup code 

const signup = async (req, resp) => {
    try {
        const { name, email, password } = req.body;
        const user = await Usermodel.findOne({ email });
        if (user) {
            return resp.status(409)
                .json({ message: "user alredy Existed login!!", success: false })
        }
        const userModel = new Usermodel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        resp.status(201)
            .json({ message: 'signup success', success: true })

    }
    catch (error) {
        resp.status(500)
            .json({ message: 'signup Failed !!', success: false })
    }


}


// login code 

const login = async (req, resp) => {
    try {
        const { email, password } = req.body;
        const user = await Usermodel.findOne({ email });
        const errormessage = "Failed to login";

        if (!user) {
            return resp.status(403)
                .json({ message: errormessage, success: false })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return resp.status(403)
                .json({ message: errormessage, success: false })
        }
        const token = jwttoken.sign(
            { email: user.email, _id: user._id }, // Payload
            process.env.JWT_SECRET,               // Secret Key
            { expiresIn: '24h' }                  // Options
        );

        resp.status(201)
            .json({
                message: 'signup success',
                success: true,
                token,
                email,
                name: user.name

            })

    }
    catch (error) {
        resp.status(500)
            .json({ message: 'signup Failed !!', success: false })
    }


}




module.exports = {
    signup,
    login
}