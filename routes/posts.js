const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    console.log(req.user);
    res.json({
        posts: {
            title:'Node.JS Tutorials',
            description: 'Learn Node JS in very easy steps'
        }
    });
});

// Export the module here...
module.exports = router;