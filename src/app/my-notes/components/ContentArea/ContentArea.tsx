"use client";

import ProfileUser from "./TopBar/ProfileUser";
import SearchBar from "./TopBar/SearchBar";
import DarkMode from "./TopBar/DarkMode";
import { useGlobalContext } from "../../../../../ContextApi";
import SidebarMenuIcon from "./TopBar/SidebarMenuIcon";
import SwiperSelection from "./NotesArea/SwiperSelection";
import AllNotesSection from "./NotesArea/AllNotesSection";
import ContentNote from "./ContentNote/ContentNote";

function ContentArea() {

    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className={`w-full h-[100%] p-5 ${darkMode[1].isSelected ? "bg-gray-700" : "bg-slate-200"} overflow-auto`}>
            <TopBar />
            <NotesArea />
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

function NotesArea() {

    const { openContentNoteObject: { openContentNote }, isMobileObject: {isMobile} } = useGlobalContext();

    return (
        <div className="flex gap-2 mt-5">
            <div className={`${openContentNote ? `${isMobile ? "w-full" : "w-[50%]"}` : "w-full"}`}>
                <SwiperSelection />
                <AllNotesSection />
            </div>
            <ContentNote />
        </div>
    )
}