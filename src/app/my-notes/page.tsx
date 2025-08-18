"use client"
import React from 'react'
import Sidebar from './components/Sidebar/page'
import ContentArea from './components/ContentArea/ContentArea'
import { Toaster } from 'react-hot-toast'
import { useGlobalContext } from '../../../ContextApi'
import ConfirmationWindow from '../utils/ConfirmationWindow'
import AddTagWindow from './components/TagsWindow/AddTagWindow'


export default function page(){

    const {
        darkModeObject: {darkMode}, openConfirmationWindowObject: {openConfirmationWindow}, openNewTagsWindowObject: {openNewTagsWindow}
    } = useGlobalContext();

    return (
        <div className='flex h-screen w-full flex-row'>
            {
                openConfirmationWindow || openNewTagsWindow && (
                    <div className='fixed w-full h-full bg-black z-50 opacity-20'>
                    </div>
                )
            }
            <AddTagWindow />
            <ConfirmationWindow />
            <Toaster 
            toastOptions={{
                style:{
                    backgroundColor: darkMode[1].isSelected ? "#1E293B" : "white", color: darkMode[1].isSelected ? "white" : "black"
                }
            }}
            />
            <Sidebar />
            <div className="flex-1 h-full overflow-y-auto">
                <ContentArea />
            </div>
            {/* <UserButton /> */}

        </div>
    )
}