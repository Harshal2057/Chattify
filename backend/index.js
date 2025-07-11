import express from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"

//local imports
import {dbConnect} from "../backend/config/database.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import cloudinaryConnect from "./config/cloudinary.js"
import messageRoutes from "./routes/message.routes.js"


dotenv.config()

const app = express();
dbConnect();
cloudinaryConnect();

const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))



//ROUTES
app.use("/api/auth" , authRouter);
app.use("/api/messageroutes" , messageRoutes);

app.get("/" , (req , res) => {
    return res.send("<h1>Chattify</h1>")
})

app.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`);
    
})