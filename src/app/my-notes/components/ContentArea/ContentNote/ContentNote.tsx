"use client"

import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../../../../ContextApi"
import { singleNoteType, SingleTagType } from "@/app/Types";
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';


function ContentNote() {

    const { openContentNoteObject: { openContentNote }, isMobileObject: { isMobile }, selectedNoteObject: { selectedNote }, allNotesObject: { allNotes, setAllNotes }, isNewNoteObject: { isNewNote, setIsNewNote } } = useGlobalContext();

    const [singleNote, setSingleNote] = useState<singleNoteType | undefined>(undefined);

    useEffect(() => {
        if (openContentNote) {
            if (selectedNote) {
                setSingleNote(selectedNote);
            }
        }
    }, [openContentNote, selectedNote])

    useEffect(() => {
        if (isNewNote) {
            if (singleNote && singleNote.title !== "") {
                setAllNotes([...allNotes, singleNote])
                setIsNewNote(false);
            }
        }
    }, [singleNote])

    return (
        <div className={`border ${isMobile ? "w-4/5" : "w-1/2"} z-502 bg-white p-3 rounded-lg ${openContentNote ? "block" : "hidden"} h-[700px] ${isMobile ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}`}>
            {
                singleNote && (
                    <ContentNoteHeader singleNote={singleNote} setSingleNote={setSingleNote} />
                )

            }
            <NoteTags singleNote={singleNote}/>
        </div>
    )
}

export default ContentNote;

function ContentNoteHeader({ singleNote, setSingleNote }: { singleNote: singleNoteType, setSingleNote: React.Dispatch<React.SetStateAction<singleNoteType | undefined>> }) {

    const { allNotesObject: { allNotes, setAllNotes }, isNewNoteObject: { setIsNewNote }, openContentNoteObject: { setOpenContentNote } } = useGlobalContext();

    function onUpdateTitle(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newSingleNote = { ...singleNote, title: e.target.value };
        setSingleNote(newSingleNote);

        const newAllNotes = allNotes.map((note) => {
            if (note._id === singleNote._id) {
                return newSingleNote;
            }
            return note;
        });

        setAllNotes(newAllNotes);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    }
    const [focus, setFocus] = useState(false);
    return (
        <div className="flex justify-between gap-8 mb-4">
            <div className="flex gap-2 w-full">
                <TitleOutlinedIcon sx={{ fontSize: 19 }} className={`${focus ? "text-purple-600" : "text-slate-400"}  mt-[4px]`} />

                <textarea
                    placeholder="New Title..."
                    value={singleNote.title}
                    onChange={onUpdateTitle}
                    onKeyDown={handleKeyDown}
                    onBlur={()=> setFocus(false)}
                    onFocus={()=> setFocus(true)}
                    onMouseEnter={()=>setFocus(true)}
                    onMouseLeave={()=>setFocus(false)}
                    className="font-bold text-xl outline-none resize-none h-auto overflow-hidden w-full"
                />
            </div>
            <CloseIcon onClick={() => {
                setIsNewNote(false);
                setOpenContentNote(false);
            }}
                className="text-slate-400 mt-[7px] cursor-pointer"
                sx={{ cursor: "pointer", fontSize: 18 }}
            />
        </div>
    )
}

function NoteTags({ singleNote }: { singleNote: singleNoteType | undefined}) {
    const [hovered, setHovered] = useState(false);
    const [isOpened,setIsOpened] = useState(false);

    useEffect(()=>{
        if(isOpened){
            setHovered(true);
        }
    },[isOpened])

    return (
        <div className="flex text-[13px] items-center gap-2">
            <StyleOutlinedIcon sx={{ fontSize: 19 }} className={`${hovered ? "text-purple-600" : "text-slate-400"}`} />
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                    if(!isOpened) setHovered(false)
                }}
                className="flex justify-between w-full relative"
            >
                <div className="flex gap-2 items-center flex-wrap">
                    {
                        singleNote?.tags.length === 0 ? <div className="bg-slate-100 text-slate-400 p-1 px-2 rounded-md">
                                Not tags
                            </div> :
                        singleNote?.tags.map((tag, idx) => (
                            <div key={idx} className="bg-slate-100 text-slate-400 p-1 px-2 rounded-md">
                                {tag}
                            </div>
                        ))
                    }
                    {
                        hovered && (
                            <EditOutlinedIcon sx={{ fontSize: 19 }}
                                className="text-slate-400 cursor-pointer"
                                onClick={()=> setIsOpened(!isOpened)} />
                        )
                    }
                </div>
                {isOpened && <TagsMenu />}
            </div>
        </div>

    )
}
//{onClickedTag} : {onClickedTag: (tag: SingleTagType) => void}
function TagsMenu() {
    const {allTagsObject: {alltags}, selctedTagsObject: {selectedTags, setSelectedTags}} = useGlobalContext();

    return (
        <ul className="absolute top-10 bg-slate-100 w-[60%] p-3 rounded-md flex flex-col gap-2">
            {
                alltags.map((tag) => (
                    <li key={tag._id}
                    // onClick={()=> onClickedTag(tag)}
                    className={`${selectedTags.some((t) => t.name.toLowerCase() === tag.name.toLocaleLowerCase()) ? "bg-slate-300" : ""}
                    p-1 px-2 select-none cursor-pointer hover:bg-slate-300 text-slate-500 rounded-md transition-all`}>
                        {tag.name}
                    </li>
                ))
            }
        </ul>
    )
}