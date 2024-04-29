import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/socket`)
    } catch (error) {
        throw new Error("some error occur while connecting to the database", error)
    }
}

export default connectDb