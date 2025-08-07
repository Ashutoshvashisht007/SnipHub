"use client";

import ProfileUser from "./TopBar/ProfileUser";
import SearchBar from "./TopBar/SearchBar";
import DarkMode from "./TopBar/DarkMode";
import { useGlobalContext } from "../../../../../ContextApi";
import SidebarMenuIcon from "./TopBar/SidebarMenuIcon";

function ContentArea() {

    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className={`w-full p-5 ${darkMode[1].isSelected ? "bg-gray-700" : "bg-white"}`}>
            <TopBar />
        </div>

    )
}

export default ContentArea;

function TopBar() {

    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className={`rounded-lg flex justify-between items-center p-3 ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"}`}>
            <ProfileUser />
            <SearchBar />
            <div className="flex gap-4 items-center">
                <DarkMode />
                <SidebarMenuIcon />
            </div>
        </div>
    )
}