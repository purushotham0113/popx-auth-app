import mongoose from 'mongoose'

const puserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    isAgency: {
        type: Boolean,
        required: true
    },
    avatar: String


})

export default mongoose.model("Puser", puserSchema)