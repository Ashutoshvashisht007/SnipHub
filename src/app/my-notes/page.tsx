import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Sidebar from './components/Sidebar/page'


export default function page(){
    return (
        <div>
            <Sidebar />
            <UserButton />

        </div>
    )
}