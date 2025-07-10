import express from "express"
import dotenv from "dotenv"

import {dbConnect} from "../backend/config/database.js"

dotenv.config()

const app = express();
dbConnect();

const PORT = process.env.PORT;

app.get("/" , (req , res) => {
    return res.send("<h1>Chattify</h1>")
})

app.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`);
    
})