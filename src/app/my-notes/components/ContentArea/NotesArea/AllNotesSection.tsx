"use client"

import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../../../../ContextApi'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { singleNoteType, SingleTagType } from '@/app/Types';
import getLanguageToIcon from '@/app/utils/LanguageTextToIcon';
import { Checkbox } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import toast from 'react-hot-toast';
import { truncateString, formatDate } from '@/app/utils/Utils';

const AllNotesSection = () => {

    const { allNotesObject: { allNotes }, sideBarMenuObject: { sideBarMenu }, openContentNoteObject: {openContentNote, setOpenContentNote} } = useGlobalContext();

    const filterIsTrahsedNotes = allNotes.filter((note) => note.isTrash === false);

    const [filteredNotes, setFilteredNotes] = useState(allNotes.filter((note) => note.isTrash === false));

    useEffect(() => {
        if (sideBarMenu[0].isSelected) {
            setFilteredNotes(allNotes.filter((note) => !note.isTrash))
        }

        if (sideBarMenu[1].isSelected) {
            setFilteredNotes(allNotes.filter((note) => note.isFavorite && !note.isTrash));
        }
    }, [allNotes]);

    useEffect(() => {
        if(openContentNote){
            setOpenContentNote(false);
        }
        if (sideBarMenu[0].isSelected) {
            setFilteredNotes(filterIsTrahsedNotes)
        }
        if (sideBarMenu[1].isSelected) {
            const filteredFavoriteNotes = allNotes.filter((note) => !note.isTrash && note.isFavorite);
            setFilteredNotes(filteredFavoriteNotes);
        }
        if (sideBarMenu[2].isSelected) {
            const filteredTrashedNotes = allNotes.filter((note) => note.isTrash);
            setFilteredNotes(filteredTrashedNotes);
        }
    }, [sideBarMenu])

    return (
        <div className={`mt-5 flex flex-wrap gap-4`}>
            {filteredNotes.map(note => (
                <SingleNote key={note._id} note={note} />
            ))}
        </div>
    )
}

export default AllNotesSection

function SingleNote({ note }: { note: singleNoteType }) {
    const { darkModeObject: { darkMode }, openContentNoteObject: { openContentNote } } = useGlobalContext();

    return (
        <div className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} ${openContentNote ? "w-full" : "w-[320px]"} max-sm:w-full rounded-md py-4 overflow-hidden`}>
            <NoteHeader _id={note._id} title={note.title} isFavirote={note.isFavorite} isTrashed={note.isTrash} />
            <NoteDate date={note.creationDate} />
            <NoteTags tags={note.tags} />
            <NoteDescription description={note.description} />
            <CodeBlock language={note.language} code={note.code} />
            <NoteFooter footer={note.language} note={note} />
        </div>
    )
}

function NoteHeader({ title, isFavirote, _id, isTrashed }: { title: string, isFavirote: boolean, _id: string, isTrashed: boolean }) {

    const { openContentNoteObject: { setOpenContentNote }, allNotesObject: { allNotes, setAllNotes }, selectedNoteObject: { selectedNote, setSelectedNote } } = useGlobalContext();

    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        if(!isTrashed){
            setOpenContentNote(true);
        }
        const temp = allNotes.find(note => note._id === _id) || null;
        setSelectedNote(temp);
    }

    const handleClickedCheckbox = () => {
        const newFavorite = !isFavirote;
        setIsFavorite(newFavorite);
        const newAllNotes = allNotes.map((note) => {
            if (note._id === _id) {
                return { ...note, isFavorite: newFavorite }
            }
            return note;
        });

        setAllNotes(newAllNotes);
    }

    return (
        <div className='flex justify-between mx-4'>
            <span onClick={handleClick} className='font-bold text-lg w-[87%] cursor-pointer'>
                {truncateString(title, 60)}
            </span>
            {
                !isTrashed && (
                    <Checkbox
                        icon={<FavoriteBorderOutlinedIcon className="text-slate-400 cursor-pointer" />}
                        checkedIcon={
                            <FavoriteIcon className='text-purple-600 cursor-pointer' />
                        }
                        checked={isFavorite}
                        onChange={handleClickedCheckbox}
                    />
                )
            }


        </div>
    )
}

function NoteTags({ tags }: { tags: SingleTagType[] }) {
    return (
        <div className='text-slate-500 text-[11px] mx-4 flex-wrap flex gap-1 mt-4'>
            {tags.map((tag) => (
                <span key={tag._id} className='bg-purple-100 text-purple-600 p-1 rounded-md px-2'>
                    {tag.name}
                </span>
            ))}
        </div>
    )
}

function NoteDate({ date }: { date: string }) {
    return (
        <div className='text-slate-500 text-[11px] mx-4 mt-1 flex gap-1 font-light'>
            <span className=''>{formatDate(new Date(date))}</span>
        </div>
    )
}

function NoteDescription({ description }: { description: string }) {

    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className={`${darkMode[1].isSelected ? "text-slate-300" : ""} text-slate-600 text-[13px] mt-4 mx-4`}>
            {truncateString(description, 200)}
        </div>
    )
}

interface CodeBlockProps {
    language: string;
    code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {

    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className='rounded-md overflow-hidden text-sm'>
            <SyntaxHighlighter language={language?.toLowerCase()} style={darkMode[1].isSelected ? oneDark : materialLight}>
                {truncateString(code, 250)}
            </SyntaxHighlighter>
        </div>
    )
}

function NoteFooter({ footer, note }: { footer: string, note: singleNoteType }) {

    const { allNotesObject: { allNotes, setAllNotes } } = useGlobalContext();

    const handleTrash = () => {
        toast((t) => (
            <div className='flex gap-2 items-center'>
                <span>Note has been moved to the trash</span>
                <button className='bg-gray-500 p-[4px] px-3 text-sm text-white rounded-md flex gap-1 items-center'
                    onClick={() => {
                        toast.dismiss(t.id);
                        resetNoteFunction();
                    }}>
                    <ReplayIcon sx={{ fontSize: 17 }} />
                    <span className='cursor-pointer'>Undo</span>
                </button>
            </div>
        ));

        const copyAllNotes = [...allNotes];
        const findIdx = copyAllNotes.findIndex((n) => n._id === note._id);

        if (findIdx === -1) {
            console.error("Note not found!");
            return;
        }

        const clickedNote = { ...copyAllNotes[findIdx], isTrash: true };
        copyAllNotes[findIdx] = clickedNote;
        setAllNotes(copyAllNotes);
    }

    function resetNoteFunction() {
        setAllNotes((prevNotes) =>
            prevNotes.map((n) =>
                n._id === note._id ? { ...n, isTrash: false } : note
            )
        );
    }
    return (
        <div className='flex justify-between text-[13px] text-slate-400 mx-4 mt-3'>
            <div className='flex gap-1 items-center'>
                {getLanguageToIcon(footer)}
                <span>{footer}</span>
            </div>
            <div className='flex gap-2 items-center'>
                {
                    note.isTrash && (
                        <RestoreFromTrashOutlinedIcon sx={{ fontSize: 17 }}
                            onClick={resetNoteFunction}
                            className='cursor-pointer' />
                    )
                }
                <DeleteRoundedIcon sx={{ fontSize: 17 }} className="cursor-pointer hover:text-red-600"
                    onClick={handleTrash} />
            </div>

        </div>
    )
}