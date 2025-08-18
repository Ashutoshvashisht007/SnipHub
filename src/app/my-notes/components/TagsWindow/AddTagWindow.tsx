"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../../../../ContextApi';
import CloseIcon from '@mui/icons-material/Close';

const tagSuggestions = [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Python",
    "Data Structures",
    "Algorithms",
    "System Design",
    "Web Development",
    "AugmentedReality",
    "EthicalHacking"
];

const AddTagWindow = () => {

    const { openNewTagsWindowObject: { openNewTagsWindow }, darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div 
            style={{ left: "0", right: "0", marginLeft: "auto", marginRight: "auto", top: "100px" }}
            className={`${openNewTagsWindow ? "fixed" : "hidden"} 
            z-100 max-sm:w-[350px] w-[500px] p-[25px] rounded-lg shadow-md ${darkMode[1].isSelected ? "bg-slate-600 text-white" : "bg-white border"}`}>
            <Header />
            <AddTagInput />
            <ButtonGroup />
        </div>
    )
}

function Header() {

    const { openNewTagsWindowObject: { setOpenNewTagsWindow } } = useGlobalContext();

    return (
        <div className='flex justify-between items-center rounded-lg'>
            <div className='flex items-center gap-2'>
                <span className='text-[18px] text-slate-600 font-bold'>
                    Add New Tag
                </span>
            </div>
            <div>
                <CloseIcon sx={{ fontSize: 15 }}
                    className='text-slate-400 cursor-pointer'
                    onClick={() => setOpenNewTagsWindow(false)} />
            </div>
        </div>
    )
}

function AddTagInput() {
    const { openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow }, darkModeObject: { darkMode } } = useGlobalContext();
    const [tagName, setTagName] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        const rand = Math.floor(Math.random() * tagSuggestions.length);
        setPlaceholder(`e.g. ${tagSuggestions[rand]}`);
    }, [openNewTagsWindow]);

    return (
        <div className='mt-6'>
            <span className='text-slate-400 text-sm font-semibold'>Tag Name</span>
            <input
                ref={inputRef}
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder={placeholder}
                className={`${darkMode[1].isSelected ? "bg-slate-700" : "bg-white border"} w-full rounded-md p-2 mt-1 text-[12px]outline-none text-slate-600`} />
        </div>
    )
}

function ButtonGroup() {

    const { openNewTagsWindowObject: { setOpenNewTagsWindow } } = useGlobalContext();

    return (
        <div className='flex justify-end mt-6 gap-2 text-[12px]'>
            <button className='px-4 py-2 text-slate-600 border rounded-md hover:bg-slate-100 cursor-pointer'
                onClick={() => setOpenNewTagsWindow(false)}>
                Cancel
            </button>
            <button className='px-4 py-2 text-white bg-green-400 rounded-md hover:bg-green-500 cursor-pointer'>Add Tag</button>
        </div>
    )
}

export default AddTagWindow