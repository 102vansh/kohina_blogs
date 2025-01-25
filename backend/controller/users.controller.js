const User = require('../models/auth.model')
const {ErrorHandler} = require('../middleware/error')


exports.getallusers = async(req,res,next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success:true,
            message:"All users fetched successfully",
            users
        })
    }catch(error){
        return next(error);
    }
}

exports.updateuser = async(req,res,next) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            user
        })
    }catch(error){
        return next(error);
    }
}
exports.deleteuser = async(req,res,next) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"User deleted successfully",
            user
        })
    }catch(error){
        return next(error);
    }
}
exports.getmyprofile = async(req,res,next) => {
    try{
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success:true,
            message:"User fetched successfully",
            user
        })
    }catch(error){
        return next(error);
    }
}