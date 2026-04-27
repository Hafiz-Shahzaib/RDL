import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        required: true
    },
    photoUrl: {
        type: String,
        default: ""
    },
    resetOtp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },

    // for admin
    isActive: {
        type: Boolean,
        default: true
    }

},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default(User);