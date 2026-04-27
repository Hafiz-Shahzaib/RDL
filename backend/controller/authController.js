import sendMail from "../config/sendMail.js";
import genToken from "../config/token.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";

// register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email})

        if(existingUser){

            // for admin : disabled or block
            if(!existingUser.isActive){
                return res.status(403).json({message: "Your account has been blocked. Please Contact from the admin."});
            }



            return res.status(400).json({messae: "User already exist."});

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({name, email, password: hashedPassword, role: "student", isActive: true});

        res.json(newUser)

    } catch (error) {

        res.status(500).json({message: error.message});

    }
}



// for signUp

export const signup = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: "User already exist."});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Enter Valid Email"})
        }
        if(password.length < 8){
            return res.status(400).json({message: "Enter Strong Password."})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashedPassword, role });

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true, 
            secure: false, 
            sameSite: "Strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({message: `SignUp error ${error}`});
    }
}




// for login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({message: "User not found."});
        }

        // for admin : Block Disabled user

        if(!user.isActive){
            return res.status(403).json({message: "Your account has been blocked. Please Contact from the admin."})
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password" });
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {

        return res.status(500).json({message: `Login error ${error}`});
        
    }
}


// for logout

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({message: "LogOut successfully"}); 
    } catch (error) {
        return res.status(500).json({message: `LogOut error ${error}`});
    }
}




// for sendOtp

export const sendOTP = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        user.resetOtp = otp,
        user.otpExpires = Date.now() + 5 * 60 * 1000,
        user.isOtpVerified = false

        await user.save();
        await sendMail(email, otp);
        return res.status(200).json({ message: "Otp send successfully"});

    } catch (error) {
        return res.status(500).json({message: `sendOTP error ${error}`});
    }
}


// for verification

export const verifyOTP = async (req, res) => {
    try {
        const {email, otp} = req.body;

        const user = await User.findOne({email});

        if(!user || user.resetOtp != otp || user.otpExpires < Date.now()){
            return res.status(404).json({message: "Invalid Otp"});
        }

        user.isOtpVerified = true,
        user.resetOtp = undefined,
        user.otpExpires = undefined

        await user.save();

        return res.status(200).json({message: "OTP verified successfully"})

    } catch (error) {

        return res.status(500).json({message: `verifyOTP error ${error}`});
        
    }
}


// for reset password

export const resetPassword = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user || !user.isOtpVerified){
            return res.status(404).json({message: "OTP verification is required"})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword,
        user.isOtpVerified = false,

        await user.save()

        return res.status(200).json({message: "Reset Password successfully"});

    } catch (error) {
        return res.status(500).json({message: `resetPassword error ${error}`});
    }
}



// for google authentication

export const googleAuth = async (req, res) => {
    try {
        const {name, email, role} = req.body;

        const user = await User.findOne({email});

        if(!user){
            user = await User.create({name, email, role})
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 *1000
        });

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({message: `Google Authentication error ${error}`});
    }
}