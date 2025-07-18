import express from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import cors from "cors"

//local imports
import {dbConnect} from "../backend/config/database.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import cloudinaryConnect from "./config/cloudinary.js"
import messageRoutes from "./routes/message.routes.js"

//Socket
import {app , server} from "./config/socket.js"


dotenv.config()


dbConnect();
cloudinaryConnect();

const PORT = process.env.PORT;

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
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

server.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`);
    
})