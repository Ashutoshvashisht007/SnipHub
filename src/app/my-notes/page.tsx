import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Sidebar from './components/Sidebar/page'
import ContentArea from './components/ContentArea/ContentArea'


export default function page(){
    return (
        <div className='flex h-screen w-full flex-row'>
            <Sidebar />
            <ContentArea />
            {/* <UserButton /> */}

        </div>
    )
}