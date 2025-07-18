import React from 'react'
import Sidebar from '../components/Sidebar'
import { assets } from '../assets/assets'
import Topbar from '../components/Topbar'
import Bottombar from '../components/Bottombar'
import ChattingArea from '../components/ChattingArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { authStore } from '../store/authStore'
import { useNavigate } from 'react-router'
import { chatStore } from '../store/chatStore'
import NoSelectedUser from '../components/NoSelectedUser'

const Homepage = () => {

    //Store
    const { logOut } = authStore();
    const { selectedUser } = chatStore();
    const navigate = useNavigate();

    return (
        <div className='min-h-screen w-screen p-2 overflow-hidden'>
            <div className='w-full '>

                <div className='bg-gray-100 p-2 flex justify-center rounded-3xl'>
                    <img src={assets.ChattifyLogo}
                        className="w-[160px]"
                    />

                    <details className="dropdown relative left-[42%]">
                        <summary className="btn m-1 border-4 border-violet-300 p-2 rounded-full">
                            <FontAwesomeIcon icon={faUser} className='text-2xl text-violet-300' />
                        </summary>
                        <ul className="menu dropdown-content text-xl bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li onClick={() => navigate("/profile")}><a>Profile</a></li>
                            <li onClick={() => logOut()} ><a>Log Out</a></li>
                        </ul>
                    </details>
                </div>

                <div className='w-full flex'>
                    <div className='w-3/12 '>
                        <Sidebar />
                    </div>


                    <div className='w-9/12 h-[850px] p-3 flex flex-col gap-3 justify-between '>
                        {selectedUser ? (
                            <>
                                <Topbar />
                                <ChattingArea />
                                <Bottombar />
                            </>
                        ) : (
                            <NoSelectedUser />
                        )}

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Homepage