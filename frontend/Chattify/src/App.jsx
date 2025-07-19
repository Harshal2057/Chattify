import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Profile
 from "./pages/Profile";
import { assets } from "./assets/assets";
import { Toaster } from "react-hot-toast";

//zustand
import { authStore } from "./store/authStore";
import { chatStore } from "./store/chatStore";

function App() {

  const{checkAuth , authUser , onlineUsers} = authStore();
  const {messages,getMessages , selectedUser} = chatStore();
 
  

    useEffect(() => {
    checkAuth();
  }, [checkAuth]);

//   useEffect(() => {
//    getMessages(selectedUser._id);
// }, []);

  // console.log("Online user =>  " , onlineUsers);
  

  return (
    <div className="h-[920px] w-full overflow-hidden">
   
        <Routes>
          <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ?  <Navigate to="/" /> :<Login />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        </Routes>

<Toaster />
    </div>
  )
}

export default App
