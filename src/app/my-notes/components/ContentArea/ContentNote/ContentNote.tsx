"use client"

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../../../ContextApi"
import { singleNoteType } from "@/app/Types";


function ContentNote() {

    const { openContentNoteObject: { openContentNote, setOpenContentNote }, isMobileObject: {isMobile}, selectedNoteObject: {selectedNote, setSelectedNote} } = useGlobalContext();

    const [singleNote, setSingleNote] = useState<singleNoteType | undefined>(undefined);

    useEffect(() => {
        if(openContentNote){
            if(selectedNote){
                setSingleNote(selectedNote);
            }
        }
    }, [openContentNote,selectedNote])

    console.log(singleNote);

    return (
        <div className={`border ${isMobile ? "w-4/5" : "w-1/2"} z-502 bg-white p-3 rounded-lg ${openContentNote? "block" : "hidden"} h-[700px] ${isMobile ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}`}>
            {
                singleNote && (
                    <ContentNoteHeader singleNote={singleNote} setSingleNote={setSingleNote} />
                )
            }
            <div className="cursor-pointer" onClick={()=> setOpenContentNote(false)}>Close</div>
        </div>
    )
}

export default ContentNote;

function ContentNoteHeader({singleNote, setSingleNote} : {singleNote: singleNoteType, setSingleNote: React.Dispatch<React.SetStateAction<singleNoteType | undefined>>}){

    const {allNotesObject: {allNotes, setAllNotes}} = useGlobalContext();

    function onUpdateTitle(e: React.ChangeEvent<HTMLInputElement>) {
        const newSingleNote = {...singleNote, title:e.target.value};
        setSingleNote(newSingleNote);

        const newAllNotes = allNotes.map((note) => {
            if(note.id === singleNote.id){
                return newSingleNote;
            }
            return note;
        });

        setAllNotes(newAllNotes);
    }

    return (
        <input placeholder="new title..." value={singleNote.title} onChange={onUpdateTitle} />
    )
}