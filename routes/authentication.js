const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { SignUp, SignIn } = require('../Controller/web/authController');
validation = [
    check('name','Name should be atleast 3 characters').isLength({min:3}),
    check('email','Enter a valid email').isEmail(),
    check('password','Password must be atleast 6 characters').isLength({min:6})
]
validation2 = [
    check('email','Enter a valid email').isEmail(),
    check('password','Password must be atleast 6 characters').isLength({min:6})
]
router.post('/Sign-Up',validation, SignUp)

router.post('/Sign-In',validation2, SignIn)
module.exports = router