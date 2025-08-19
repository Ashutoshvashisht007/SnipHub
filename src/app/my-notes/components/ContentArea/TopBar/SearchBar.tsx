"use client";

import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "../../../../../../ContextApi";
import {v4 as uuidv4} from "uuid";

function SearchBar() {

    const { darkModeObject : {darkMode}} = useGlobalContext();

    return (
        <div className={`relative pl-3 w-[60%] h-[38px] rounded-3xl flex items-center gap-2 ${darkMode[1].isSelected ? "bg-slate-100" : "bg-slate-200"}`}>
            <SearchIcon className="text-purple-500" sx={{ fontSize: 13 }} />
            <input
                placeholder="Search a Snippet....."
                className={`w-[70%] outline-none text-sm p-[8px] ${darkMode[1].isSelected ? "bg-slate-100 text-slate-500" : "bg-slate-200 "}`} />
            <AddSnippetButton />
        </div>
    )
}

function AddSnippetButton() {
    const {openContentNoteObject: {setOpenContentNote}, selectedNoteObject: {setSelectedNote}, isNewNoteObject: {isNewNote, setIsNewNote}, shareUserIdObject: {shareUserId}} = useGlobalContext();

    const openTheContentNote = (e: React.MouseEvent<HTMLDivElement>) => {
        const newSingleNote = {
            _id: uuidv4(),
            clerkUserId: shareUserId || "",
            title: "",
            creationDate: new Date().toISOString(),
            tags: [],
            description: "",
            code: "",
            isFavorite: false,
            language: "",
            isTrash: false,
        };

        // setAllNotes([...allNotes,newSingleNote]);

        setIsNewNote(true)
        setSelectedNote(newSingleNote);
        setOpenContentNote(true);
    }

    

    return (
        <div className="absolute flex gap-2 px-3 rounded-3xl bg-purple-600 p-1 text-[13px] text-white top-[5px] right-[6px] items-center cursor-pointer select-none"
        onClick={openTheContentNote}>
            <div className="font-bold">+</div>
            <div className="max-md:hidden">Snippet</div>
        </div>
    )
}

export default SearchBar;