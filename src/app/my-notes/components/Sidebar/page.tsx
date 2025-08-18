"use client";

import React from "react";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useGlobalContext } from "../../../../../ContextApi";
import getLanguageToIcon from "@/app/utils/LanguageTextToIcon";
import { captilizeFirstOccurence } from "@/app/utils/Utils";

export default function Sidebar() {

    const { darkModeObject: { darkMode },
        openSideBarObject: { openSidebar, setOpenSidebar } } = useGlobalContext();

    return (
        <div className={`${openSidebar ? "fixed z-50 shadow-lg" : "max-md:hidden"} pr-10 p-6 flex flex-col gap-2 h-screen pt-7 ${darkMode[1].isSelected ? "bg-gray-800" : "bg-white"}`}>
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
                <DataObjectIcon sx={{ fontSize: 27, color: "white" }} />
            </div>
            <div className="flex gap-1 text-[19px]">
                <span className="font-bold text-purple-600">Snip</span>
                <span className="font-bold text-purple-600">Hub</span>
            </div>
        </div>
    )
}

function QuickLinks() {

    const { sideBarMenuObject: { sideBarMenu, setSideBarMenu }, tagsAndLogoutMenuObject: {tagsAndLogoutMenu, setTagsAndLogoutMenu},
openTagsWindowObject: {openTagsWindow, setOpenTagsWindow} } = useGlobalContext();
    console.log(sideBarMenu);

    function clickedMenu(index: number) {
        const updatedSideBarMenu = sideBarMenu.map((menu, i) => {
            if (i === index) {
                return { ...menu, isSelected: true };
            }
            else {
                return { ...menu, isSelected: false };
            }
        });

        setSideBarMenu(updatedSideBarMenu);
    }

    function clickedTagsorLogout(index: number){
        const updatedTagsAndLogout = tagsAndLogoutMenu.map((menu, i) => {
            if (i === index) {
                if(menu.isSelected === true){
                    setOpenTagsWindow(false);
                    return {...menu, isSelected: false}
                }
                else{
                    setOpenTagsWindow(true);
                    return { ...menu, isSelected: true };
                }
            }
            else {
                return { ...menu, isSelected: false };
            }
        });

        setTagsAndLogoutMenu(updatedTagsAndLogout);
    }

    return (
        <div className="mt-20 text-sm">
            <div className="font-bold text-slate-400">Quick Links</div>
            <ul className="text-slate-400 ${} mt-4 flex flex-col gap-2">
                {
                    sideBarMenu.map((menu, index) => (
                        <li key={index}
                            onClick={() => clickedMenu(index)}
                            className={`flex ${menu.id === 4 ? "mt-4" : ""} gap-2 items-center select-none
                            ${menu.isSelected ? "bg-purple-600 text-white" : "text-slate-400"} p-[7px] px-2 rounded-md hover:bg-purple-600 hover:text-white cursor-pointer w-[100%]`}>
                            {menu.icons}
                            <span>{menu.name}</span>
                        </li>
                    ))
                }
            </ul>
            <ul className="text-slate-400 ${} mt-6 flex flex-col gap-2">
                {
                    tagsAndLogoutMenu.map((menu, index) => (
                        <li key={index}
                            onClick={() => clickedTagsorLogout(index)}
                            className={`flex ${menu.id === 4 ? "mt-4" : ""} gap-2 items-center select-none
                            ${menu.isSelected ? "bg-purple-600 text-white" : "text-slate-400"} p-[7px] px-2 rounded-md hover:bg-purple-600 hover:text-white cursor-pointer w-[100%]`}>
                            {menu.icons}
                            <span>{menu.name}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

function Languages() {

    const { codeLanguageCounterObject: { codeLanguageCounter } } = useGlobalContext();

    return (
        <div className="mt-12 text-sm">
            {
                codeLanguageCounter.length > 0 && (
                    <>
                        <div className="font-bold text-slate-400">Languages</div>
                        <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
                            {
                                codeLanguageCounter.map((language, idx) => (
                                    <div key={idx} className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            {
                                                getLanguageToIcon(captilizeFirstOccurence(language.language))
                                            }
                                            <span>{captilizeFirstOccurence(language.language)}</span>
                                        </div>
                                        <span className="font-bold">{language.count}</span>
                                    </div>
                                ))
                            }

                        </div>
                    </>
                )
            }

        </div>
    )
}