const { signup, login } = require("../Controllers/Authcontroller");
const { signupvalidation, loginvalidation } = require("../Middlewares/Validations");

const router = require("express").Router();

router.post('/signup', signupvalidation, signup);
router.post('/login', loginvalidation, login);

module.exports = router;