import express from  "express";
import { getAllUsers , getMessages , sendMessage } from "../controller/message";

const messageRoutes = express.Router();

messageRoutes.get("/getUsers" , getAllUsers);
messageRoutes.get("/getMessages" , getMessages);
messageRoutes.post("/sendMessage" , sendMessage);

export default messageRoutes;

