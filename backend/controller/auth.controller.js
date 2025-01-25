const User = require('../models/auth.model')
const {ErrorHandler} = require('../middleware/error')
exports.register = async(req,res,next) => {
    try{
        const{name,email,password,role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message: 'All fields are required'});
        }
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        user = await User.create({name,email,password,role});
res.status(201).json({
    success:true,
    message:"User registered successfully",
    user
})

    }catch(error){
        return next(error);
        
    }

}
exports.login = async(req,res,next) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        let user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = user.generateToken();
        res.status(200).cookie('token',token).json({
            success:true,
            message:"User logged in successfully",
            user,
            token
        })
    }catch(error){
        return next(error);
    }
}
exports.logout =async(req,res,next)=>{
    try{
res.status(200).cookie('token',null,{
    expires:new Date(Date.now()),
   httpOnly:true
   .json({
    success:true,
    message:"User logged out successfully"
   })
    })

    }catch(error){
        return next(error);
    }
}