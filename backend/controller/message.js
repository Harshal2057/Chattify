import User from "../models/User.js"
import Message from "../models/message.js";
import uploadPhoto from "../utils/photoUpload.js";


const getAllUsers = async(req , res) => {
    try {
        
        const loggedInUser = req.user._id;

        const fillteredUser = await User.find({_id:{$ne:loggedInUser}}).select("-password");

        return res.status(200).json({
            success:true,
            message:"User fetched successfully!!",
            fillteredUser
        })

    } catch (error) {
        console.log(`Error occured while fetching all the user => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while fetching all the user => ${error}`,
        })
        
    }
}

const getMessages = async(req ,res) => {
    try {

        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const getMessages = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId}
            ]
        })

        return res.status(200).json({
            success:true,
            message:"Messages fetched from database successfully"
        })
    } catch (error) {
        console.log(`Error occured while fetching messages from database => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while fetching messages from database => ${error}`
        })
        
    }
}

const sendMessage = async(req , res) => {
    try {
        const {text , image} = req.body;
        const {id : receiverId }= req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await uploadPhoto(image , "messageImage");

            if (uploadResponse) {
                imageUrl = uploadResponse.secure_url
            }
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            images:imageUrl
        })

        //todo : realtime functionality using socket.io

    } catch (error) {
        console.log(`Error occured while sending meassage => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while sending meassage => ${error}`
        })
        
    }
}

export {getAllUsers , getMessages , sendMessage} ;