import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:String,
        required:true
    },

    receiverId:{
        type:String,
        required:true
    },

    message:{
        type:String,
    },

    images:{
        type:String,
    }
} , 
    {
        timestamps:true
    }
)

export default mongoose.model("message" , messageSchema);
