"use client"

import React from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useGlobalContext } from '../../../../../../ContextApi'

const SidebarMenuIcon = () => {

    const { openSideBarObject: { openSidebar, setOpenSidebar } } = useGlobalContext();

    return (
        <>
            {
                !openSidebar ? (
                    <div onClick={() => setOpenSidebar(!openSidebar)} className="hidden text-slate-500 cursor-pointer max-md:block">
                        <MenuOutlinedIcon />
                    </div>) : (
                    <div onClick={() => setOpenSidebar(!openSidebar)} className="hidden text-slate-500 cursor-pointer max-md:block">
                        <CloseOutlinedIcon />
                    </div>
                )
            }

        </>
    )
}

export default SidebarMenuIcon