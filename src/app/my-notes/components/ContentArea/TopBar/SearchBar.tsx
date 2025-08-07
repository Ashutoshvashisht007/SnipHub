"use client";

import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "../../../../../../ContextApi";

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
    return (
        <div className="absolute flex gap-2 px-3 rounded-3xl bg-purple-600 p-1 text-[13px] text-white top-[5px] right-[6px] items-center cursor-pointer select-none">
            <div className="font-bold">+</div>
            <div className="max-md:hidden">Snippet</div>
        </div>
    )
}

export default SearchBar;