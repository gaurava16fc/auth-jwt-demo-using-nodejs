const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized! Access Denied.');
        }

        // Verify the token...
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err) {
        return res.status(400).send('Invalid Token');        
    }
}

