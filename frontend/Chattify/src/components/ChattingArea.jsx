import React from 'react'
import { chatStore } from '../store/chatStore'
import { useEffect } from 'react';

const ChattingArea = () => {

  const{messages , getMessages , isLoadingMessage , selectedUser} = chatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages , selectedUser._id])

  return (
    <div className='h-[690px] bg-gray-100 rounded-3xl p-3 '>
        ChattingArea
        </div>
  )
}

export default ChattingArea