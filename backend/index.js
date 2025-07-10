import express from "express"
import dotenv from "dotenv"

//local imports
import {dbConnect} from "../backend/config/database.js"
import authRouter from "./routes/auth.routes.js"


dotenv.config()

const app = express();
dbConnect();

const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth" , authRouter);

app.get("/" , (req , res) => {
    return res.send("<h1>Chattify</h1>")
})

app.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`);
    
})