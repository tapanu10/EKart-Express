const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('./../helpers/authHelper');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;

        if (!name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ message: 'Password is required' });
        }
        if (!phone) {
            return res.status(400).send({ message: 'Phone is required' });
        }
        if (!address) {
            return res.status(400).send({ message: 'Address is required' });
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is required' });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ success: false, message: "Already registered. Please login" });
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, phone, address, password: hashedPassword,answer }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        });
    }
};

//login controller

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(400).send({ success: false, message: 'Invalid password' });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
};

//forgotPasswordController
const forgotPasswordController=async(req,res)=>{
    try{
        const {email,answer,newPassword}=req.body;
         if(!email){
            res.status(400).send({message:'Email is required'})
         }
         if(!answer){
            res.status(400).send({message:'answer is required'})
         }
         if(!newPassword){
            res.status(400).send({message:'Email is required'})
         }
    //check 
    const user=await userModel.findOne({email,answer});
     //validation
      if(!user){
            return res.status(404).send({
             success:false,
             message:'Wrong Email or Answer'
           })
       }
       const hashed=await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
        success:true,
        message:"Password Reset Succesfully"
       });
   }
    catch(error){
         console.log(error)
         res.status(500).send({
            success:false,
            message:'Something went wrong',
            error

         })
    }

}

//test controller
const testController=(req,res)=>{
    res.send("protected Route")
}

module.exports = { registerController, loginController,forgotPasswordController,testController };
