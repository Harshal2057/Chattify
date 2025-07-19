import React from 'react'
import { chatStore } from '../store/chatStore'
import { useEffect } from 'react';
import { authStore } from '../store/authStore';
import { assets } from '../assets/assets';

const ChattingArea = () => {

  const{messages , getMessages , isLoadingMessage , selectedUser} = chatStore();
  const {authUser} = authStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages , selectedUser._id])

 

  return (
    <div className='h-[690px] bg-gray-100 rounded-3xl p-3 '>
        
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          { Array.isArray(messages) && messages.map((message , i) => {
            return(
              <div key={i}
                className={`chat ${message.senderId === authUser.user._id ? "chat-end" : "chat-start" }`}
              >
                  <div className='chat-image avatar'>
                      <div className='size-10 rounded-full border'>
                              <img src={message.senderId === authUser.user._id ? authUser.user.profilePic || assets.userIcon : selectedUser.profilePic || assets.userIcon } alt='' />
                      </div>
                  </div>

                  <div className='chat-header mb-1'>
                      <time className='text-xs opacity-50 ml-1'>{message.createdAt}</time>
                  </div>
                  <div className='chat-bubble flex'>
                        {message.images && (
                          <img src={message.images} alt='attachment'
                          className='size-40 rounded-md mb-2'
                          />
                        )}
                        {message.text && <p>{message.text}</p>}
                  </div>
              </div>
            )
          })}
        </div>

        </div>
  )
}

export default ChattingArea