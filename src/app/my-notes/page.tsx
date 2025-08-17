"use client"
import React from 'react'
import Sidebar from './components/Sidebar/page'
import ContentArea from './components/ContentArea/ContentArea'
import { Toaster } from 'react-hot-toast'
import { useGlobalContext } from '../../../ContextApi'
import ConfirmationWindow from '../utils/ConfirmationWindow'


export default function page(){

    const {
        darkModeObject: {darkMode}, openConfirmationWindowObject: {openConfirmationWindow}
    } = useGlobalContext();

    return (
        <div className='flex h-screen w-full flex-row'>
            {
                openConfirmationWindow && (
                    <div className='fixed w-full h-full bg-black z-50 opacity-20'>
                    </div>
                )
            }
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