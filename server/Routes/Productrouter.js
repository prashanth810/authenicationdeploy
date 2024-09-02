const router = require("express").Router();
const ensuerauth = require("../Middlewares/Authmiddleware");


router.get('/', ensuerauth, (req, resp) => {
    resp.status(200).json([
        {
            "name": "Mobile",
            "price": 10000,
        },
        {
            "name": "Laptop",
            "price": 15000,
        },
    ])
});

module.exports = router;