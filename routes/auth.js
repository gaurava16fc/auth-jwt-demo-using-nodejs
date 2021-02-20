const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Validations...
const {registerValidation, loginValidation}  = require('../validation');


router.post('/register', async (req, res) => {
    //Perform validations on user input...
    const {error} = registerValidation(req.body);
    if (error) {        
        return res.status(400).send(error.details[0].message);
    }
    
    // Check if the user email is already exists into the database....
    if (userFromRepo) {
        return res.status(400).send('Email already exists.');
    }

    // Hash the password...
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // res.send('Registeration process');
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    // console.log(user);

    try {
        const savedUser = await user.save();
        res.send({savedUser: savedUser._id});
    }catch(err) {
        res.status(400).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    // res.send('Login process');

    //Perform validations on user input...
    const {error} = loginValidation(req.body);
    if (error) {        
        return res.status(400).send(error.details[0].message);
    }
    
    // Check if the user email is already exists into the database....
    const userFromRepo = await User.findOne( {email: req.body.email});
    if (!userFromRepo) {
        return res.status(400).send('Email or password is invalid.');
    }

    const isValidPassword = await bcrypt.compare(req.body.password, userFromRepo.password);
    if (!isValidPassword) {
        return res.status(400).send('Invalid password.');
    }

    const token = jwt.sign({_id: userFromRepo._id}, process.env.TOKEN_SECRET, { expiresIn: '120s' });
    res.header('auth-token', token);//.send(token);
    res.json(token);
});

// Export the module here...
module.exports = router;