const jwt = require("jsonwebtoken");


const ensuerauth = (req, resp, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        return resp.status(403)
            .json({ message: "Unauthorized , jwt token required" });
    }
    try {
        const decodedata = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decodedata;
        next();
    }
    catch (error) {
        return resp.status(403)
            .json({ message: "Unauthorized , jwt token expired" });

    }
}

module.exports = ensuerauth;
