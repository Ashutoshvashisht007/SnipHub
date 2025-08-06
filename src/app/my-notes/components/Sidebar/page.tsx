import React from "react";
import DataObjectIcon from "@mui/icons-material/DataObject";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SiCplusplus, SiJavascript, SiPython } from "react-icons/si";

export default function Sidebar() {
    return (
        <div className="w-[20%] p-5 flex flex-col gap-2 h-screen pt-7 border-r border-gray-400">
            <Logo />
            <QuickLinks />
            <Languages />
        </div>
    )
}

function Logo() {
    return (
        <div className="flex gap-2 items-center">
            <div className="bg-purple-600 p-[6px] rounded-md">
                <DataObjectIcon sx={{fontSize:27, color: "white"}}/>
            </div>
            <div className="flex gap-1 text-[19px]">
                <span className="font-bold text-purple-600">Snip Hub</span>
            </div>
        </div>
    )
}

function QuickLinks() {
    return (
        <div className="mt-20 text-sm">
            <div className="font-bold text-slate-400">Quick Links</div>
            <ul className="text-slate-400 mt-4 flex flex-col gap-2">
                <li className="flex gap-1 items-center bg-purple-600 text-white p-[7px] px-2 rounded-md w-[60%]">
                    <BorderAllIcon sx={{ fontSize: 18 }} />
                    <span>All Notes</span>
                </li>

                <li className="flex gap-1 items-center p-[7px] px-2 rounded-md w-[60%] hover:bg-purple-600 hover:text-white cursor-pointer">
                    <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                    <span>Favorites</span>
                </li>

                <li className="flex gap-1 items-center p-[7px] px-2 rounded-md w-[60%] hover:bg-purple-600 hover:text-white cursor-pointer">
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                    <span>Trash</span>
                </li>
            </ul>
        </div>
    )
}

function Languages(){
    return (
        <div className="mt-12 text-sm">
            <div className="font-bold text-slate-400">Languages</div>
            <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <SiJavascript size={15} /> Javascript
                    </div>
                    <span className="font-bold">3</span>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <SiPython size={15} /> Python
                    </div>
                    <span className="font-bold">5</span>
                </div>
                
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <SiCplusplus size={15} /> C++
                    </div>
                    <span className="font-bold">7</span>
                </div>
            </div>
        </div>
    )
}