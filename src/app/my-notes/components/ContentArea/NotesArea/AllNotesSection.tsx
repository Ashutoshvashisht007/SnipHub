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
import EmptyPlaceHolder from '@/app/utils/EmptyPlaceHolder';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import TagsWindow from '../../TagsWindow/TagsWindow';
import { FaBullseye } from 'react-icons/fa';

const AllNotesSection = () => {

    const {
        allNotesObject: { allNotes },
        sideBarMenuObject: { sideBarMenu },
        tagsAndLogoutMenuObject: { tagsAndLogoutMenu },
        tagsClickedObject: { tagsClicked, setTagsClicked },
        isLoadingObject: { isLoading, setIsLoading }
    } = useGlobalContext();

    let filteredNotes: singleNoteType[] = [];

    if (sideBarMenu[0].isSelected) {
        if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
            filteredNotes = allNotes.filter((note) => !note.isTrash);
        }
        else if (tagsClicked.length > 0) {
            filteredNotes = allNotes.filter((note) => {
                return tagsClicked.every((selectedTags) => note.tags.some((noteTag) => noteTag.name === selectedTags))
            }).filter((note) => !note.isTrash);
        }
    } else if (sideBarMenu[1].isSelected) {
        filteredNotes = allNotes.filter((note) => note.isFavorite && !note.isTrash);
    } else if (sideBarMenu[2].isSelected) {
        filteredNotes = allNotes.filter((note) => note.isTrash);
    }

    if (isLoading) {
        return (
            <div className='mt-5 flex flex-wrap gap-4'>
                <ShimmerNoteEffect />
                <ShimmerNoteEffect />
                <ShimmerNoteEffect />
            </div>
        )
    }

    function ShimmerNoteEffect() {
        return (
            <div className='h-[380px] w-[300px] bg-slate-200 rounded-md flex-col'>
                <div className='flex justify-between px-5 pt-5'>
                    <div className='2-1/2 h-7 bg-slate-300 rounded-sm'></div>
                    <div className='w-7 h-7 bg-slate-300 rounded-sm'></div>
                </div>
                <div className='h-[230px] mt-12 w-full bg-slate-300'></div>
            </div>
        )
    }

    return (
        <div className="mt-5 flex flex-wrap gap-4">
            {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => <SingleNote key={note._id} note={note} />)
            ) : (
                <>
                    {sideBarMenu[0].isSelected && (
                        <>
                            {filteredNotes.length === 0 ? (
                                tagsClicked.filter((tag) => tag !== "All").length > 0 ? (
                                    <EmptyPlaceHolder
                                        muiIcon={<TextSnippetOutlinedIcon sx={{ fontSize: 140 }} />}
                                        text={
                                            <span className="text-slate-400 text-lg text-center">
                                                It looks like there's no snippets <br /> with these tags
                                            </span>
                                        }
                                        isNew={true}
                                    />
                                ) : (
                                    <EmptyPlaceHolder
                                        muiIcon={<TextSnippetOutlinedIcon sx={{ fontSize: 140 }} />}
                                        text={
                                            <span className="text-slate-400 text-lg text-center">
                                                It looks like there's no snippets right now
                                            </span>
                                        }
                                        isNew={true}
                                    />
                                )
                            ) : null}
                        </>
                    )}

                    {sideBarMenu[1].isSelected && (
                        <EmptyPlaceHolder
                            muiIcon={<FavoriteBorderOutlinedIcon sx={{ fontSize: 140 }} />}
                            text={
                                <span className="text-slate-400 text-lg text-center">
                                    It looks like there's no snippets right now
                                </span>
                            }
                        />
                    )}

                    {sideBarMenu[2].isSelected && (
                        <EmptyPlaceHolder
                            muiIcon={<DeleteOutlineOutlined sx={{ fontSize: 140 }} />}
                            text={
                                <span className="text-slate-400 text-lg text-center">
                                    It looks like there's no snippets right now
                                </span>
                            }
                        />
                    )}
                </>
            )}

            {
                tagsAndLogoutMenu[0].isSelected && <TagsWindow />
            }
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

    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        if (!isTrashed) {
            setOpenContentNote(true);
        }
        const temp = allNotes.find(note => note._id === _id) || null;
        setSelectedNote(temp);
    }

    const handleClickedCheckbox = async () => {
        const currentFav = isFavirote;
        const newFav = !currentFav;

        try {
            const response = await fetch(`/api/snippets?snippetId=${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isFavorite: isFavirote })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updateNote = await response.json();

            setAllNotes((prevnotes) => prevnotes.map((note) => note._id === _id ? { ...note, isFavorite: newFav } : note));

        } catch (error) {
            console.log(error);
        }
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
                        checked={isFavirote}
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

    const { allNotesObject: { allNotes, setAllNotes }, openConfirmationWindowObject: { setOpenConfirmationWindow }, selectedNoteObject: { setSelectedNote } } = useGlobalContext();


    const handleTrash = async () => {

        if (note.isTrash) {
            setOpenConfirmationWindow(true);
            setSelectedNote(note);
            return;
        }

        toast((t) => (
            <div className='flex gap-2 items-center'>
                <span>Note has been moved to the trash</span>
                <button className='bg-gray-500 p-[4px] px-3 text-sm text-white rounded-md flex gap-1 items-center'
                    onClick={() => {
                        toast.dismiss(t.id);
                        resetNoteFunction(note._id);
                    }}>
                    <ReplayIcon sx={{ fontSize: 17 }} />
                    <span className='cursor-pointer'>Undo</span>
                </button>
            </div>
        ));

        try {
            const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isTrash: true })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updateNote = await response.json();
            setAllNotes((prevNotes) => prevNotes.map((n) => n._id === note._id ? { ...n, isTrash: true } : n));


        } catch (error) {
            console.log(error);
        }
    }

    const resetNoteFunction = async (noteId: string) => {
        try {
            const response = await fetch(`/api/snippets?snippetId=${noteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isTrash: false })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updateNote = await response.json();
            setAllNotes((prevNotes) => prevNotes.map((n) => n._id === note._id ? { ...n, isTrash: false } : n));
            toast.success("Note has been restored");
        } catch (error) {
            console.log(error);
        }
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
                            onClick={() => resetNoteFunction(note._id)}
                            className='cursor-pointer' />
                    )
                }
                <DeleteRoundedIcon sx={{ fontSize: 17 }} className="cursor-pointer hover:text-red-600"
                    onClick={handleTrash} />
            </div>

        </div>
    )
}