import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Sidebar from './components/Sidebar/page'
import ContentArea from './components/ContentArea/ContentArea'


export default function page(){
    return (
        <div className='flex h-screen w-full flex-row'>
            <Sidebar />
            <div className="flex-1 h-full overflow-y-auto">
                <ContentArea />
            </div>
            {/* <UserButton /> */}

        </div>
    )
}