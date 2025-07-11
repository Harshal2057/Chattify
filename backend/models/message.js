import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    text:{
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

export default mongoose.model("Message" , messageSchema);
