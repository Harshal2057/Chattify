import { create } from "zustand";
import { axiosInstace } from "../lib/axios";
import toast from "react-hot-toast";
import { authStore } from "./authStore";
import message from "../../../../backend/models/message";


export const chatStore = create((set , get) => ({
    users: [],
    messages:[],
    selectedUser: null,
    isLoadingUser: false,
    isLoadingMessage:false,

    getUser: async() => {
        set({isLoadingUser:true});

        try {
            const res = await axiosInstace.get("/messageroutes/getUsers");
            set({users:res.data})
        } catch (error) {
              const errorMessage = error.response?.data?.message || "Something went wrong in getUser";
             toast.error(errorMessage);
        }finally{
            set({isLoadingUser:false})
        }
    },

    getMessages: async(userId) => {
        set({isLoadingMessage:true})

        try {
            const res = await axiosInstace.get(`/messageroutes/getMessages/${userId}`);
            set({message:res.data})
        } catch (error) {
               const errorMessage = error.response?.data?.message || "Something went wrong in getMessage";
             toast.error(errorMessage);
        }finally{
          set({isLoadingMessage:false})
        }
    },

    sendMessage: async(messageData) => {

        const {selectedUser , messages} = get();

        try {
            const res = await axiosInstace.post(`/messageroutes/sendMessage/${selectedUser._id}` , messageData);
            set({messages:[...messages , res.data]})

        } catch (error) {
               const errorMessage = error.response?.data?.message || "Something went wrong in sendMessage";
             toast.error(errorMessage);
        }
    },

    subscribeToMessages: async() => {

        const {selectedUser} = get();

        if (!selectedUser) {
            return;
        }

        const socket = authStore.getState().socket;

        socket.on("newMessage" , (newMessage) => {
                set({messages:[...get().messages , newMessage]})
        })

    },

    unSubscribeToMessages: async() => {
        const socket = authStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));