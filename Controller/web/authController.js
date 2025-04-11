const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
SECRET_KEY='ahmad123key'

const SignUp = async (req, res) => {
    try {
    
        const errors = validationResult(req);
        const salt = await bcrypt.genSalt(10);
        const{name,email,password} = req.body;
        const hashPassword = await bcrypt.hash(password,salt);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
 
        const user = new User({
            name,
            email,
            password:hashPassword
        })
        const check = await User.findOne({email:email})
        if(check){
            return res.status(400).json({error:"Sorry a user with this email already exists"})
        }
        const data = {
            user:{
              id:user.id
            }
          }
        const token = jwt.sign(data, SECRET_KEY)
         await user.save().then(() => {
            res.status(200).json({ status:1,message: "User registered successfully",token:token})
        }).catch((e) => {
            res.status(400).json({error:e,msg:"Some error occured"})
        })
        
    } catch (errors) {
      console.log(errors.message)
      res.status(500).send('Internal Server Error');
       
    }
};
const SignIn = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    try {
        const {email,password}= req.body
        const user = await User.findOne({email})
        if (user){
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch){
                const data = {
                    user:{
                      id:user.id
                    }
                  }
                const token = jwt.sign(data, SECRET_KEY)
                res.status(200).json({status: 1 , message:"Logged In Successfully",token:token})
            }else{
                return  res.status(400).json({ status: 0 ,error:"Invalid credentials"})
            }
        }else {
            return res.status(400).json({ status: 0 ,error:"Invalid credentials"})
        }
    } catch (errors) {
        console.log(errors.message)
      res.status(500).send('Internal Server Error');
    }
}
module.exports = {SignUp,SignIn};