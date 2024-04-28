import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config()
app.listen(process.env.PORT,()=>{
    console.log("port is running in my world")
})