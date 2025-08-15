"use client"

import React from 'react'
import { useGlobalContext } from '../../../../../../ContextApi'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SiJavascript } from 'react-icons/si';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { singleNoteType, SingleTagType } from '@/app/Types';

const AllNotesSection = () => {

    const { allNotesObject: { allNotes } } = useGlobalContext();

    return (
        <div className='mt-5 flex flex-wrap gap-4'>
            {allNotes.map(note => (
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
            <NoteHeader _id={note._id} title={note.title} isFavirote={note.isFavorite} />
            <NoteDate date={note.creationDate} />
            <NoteTags tags={note.tags} />
            <NoteDescription description={note.description} />
            <CodeBlock language={note.language} code={note.code} />
            <NoteFooter footer={note.language} />
        </div>
    )
}

function NoteHeader({ title, isFavirote, _id }: { title: string, isFavirote: boolean, _id: string }) {

    const { openContentNoteObject: { setOpenContentNote }, allNotesObject: { allNotes }, selectedNoteObject: { selectedNote, setSelectedNote } } = useGlobalContext();

    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        setOpenContentNote(true);

        const temp = allNotes.find(note => note._id === _id) || null;
        setSelectedNote(temp);
    }

    return (
        <div className='flex justify-between mx-4'>
            <span onClick={handleClick} className='font-bold text-lg w-[87%] cursor-pointer'>
                {title}
            </span>

            <FavoriteBorderOutlinedIcon className="text-slate-400 cursor-pointer" />
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
            <span className=''>{date}</span>
        </div>
    )
}

function NoteDescription({ description }: { description: string }) {

    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className={`${darkMode[1].isSelected ? "text-slate-300" : ""} text-slate-600 text-[13px] mt-4 mx-4`}>
            {description}
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
            <SyntaxHighlighter language={language} style={darkMode[1].isSelected ? oneDark : materialLight}>
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

function NoteFooter({ footer }: { footer: string }) {

    // const { selectedLanguageObject: { selectedLanguage } } = useGlobalContext();

    return (
        <div className='flex justify-between text-[13px] text-slate-400 mx-4 mt-3'>
            <div className='flex gap-1 items-center'>
                <SiJavascript size={15} className='' />
                {footer}
            </div>
            <DeleteRoundedIcon sx={{ fontSize: 17 }} className="cursor-pointer" />
        </div>
    )
}