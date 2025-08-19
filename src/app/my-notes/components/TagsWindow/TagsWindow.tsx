"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../../../../ContextApi'
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { AddOutlined, DeleteRounded, DragIndicatorOutlined, EditRounded, SearchRounded } from '@mui/icons-material';
import { singleNoteType, SingleTagType } from '@/app/Types';
import toast from 'react-hot-toast';
import EmptyPlaceHolder from '@/app/utils/EmptyPlaceHolder';

const TagsWindow = () => {
    const { openTagsWindowObject: { openTagsWindow }, } = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div
            style={{ left: "0", right: "0", marginLeft: "auto", marginRight: "auto", top: "40%", transform: "translateY(-50%)" }}
            className={`${openTagsWindow ? "fixed" : "hidden"} border m-20 w-1/2 z-50 p-4 bg-white shadow-md rounded-md`}
        >
            <Header />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <TagList searchQuery={searchQuery} />
        </div>
    )
}

export default TagsWindow

function Header() {

    const { tagsAndLogoutMenuObject: { tagsAndLogoutMenu, setTagsAndLogoutMenu } } = useGlobalContext();

    function handleClick() {
        const updatedTagsAndLogout = tagsAndLogoutMenu.map((menu, i) => {
            if (i === 0) {
                return { ...menu, isSelected: false };
            }
            else {
                return { ...menu, isSelected: false };
            }
        });

        setTagsAndLogoutMenu(updatedTagsAndLogout);
    }

    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <StyleOutlinedIcon />
                <span className='text-md font-bold'>Tags</span>
            </div>
            <div onClick={handleClick}>
                <CloseIcon sx={{ fontSize: 16 }}
                    className='text-slate-400 cursor-pointer' />
            </div>
        </div>
    )
}

function SearchBar({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: React.Dispatch<React.SetStateAction<string>> }) {

    const { openNewTagsWindowObject: { setOpenNewTagsWindow }, openTagsWindowObject: { openTagsWindow } } = useGlobalContext();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [openTagsWindow])

    return (
        <div className='flex gap-5 items-center justify-between mt-11'>
            <div className='h-[42px] flex items-center text-sm rounded-md bg-slate-50 pl-3 gap-1 w-[85%]'>
                <SearchRounded className='text-slate-400' />
                <input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search a tag...'
                    className='bg-transparent outline-none w-full font-light' />
            </div>
            <button className='bg-purple-600 ml-2 p-[10px] flex w-[15%] text-sm rounded-md text-white items-center justify-center max-lg:w-[50px] cursor-pointer'
                onClick={() => setOpenNewTagsWindow(true)}
            >
                <AddOutlined sx={{ fontSize: 17 }} />
                <span className='max-md:hidden'>Add Tag</span>
            </button>
        </div>
    )
}

function TagList({ searchQuery }: { searchQuery: string }) {

    const { allTagsObject: { alltags }, darkModeObject: {darkMode} } = useGlobalContext();

    const tagsExcludingAll = alltags.filter((tag) => tag.name !== "All");

    const filterTagsOnSearch = tagsExcludingAll.filter((tag)=> tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className={`rounded-md p-4 ${darkMode[1].isSelected ? "bg-slate-600" : "bg-slate-50"}  h-[380px] overflow-auto mt-9 flex flex-col gap-4`}>
            {
                tagsExcludingAll.length === 0 && (
                    <EmptyPlaceHolder
                        muiIcon={
                            <StyleOutlinedIcon sx={{ fontSize: 66 }}
                                className='text-slate-400' />
                        }
                        text={
                            <span className='text-slate-400'>No Tags Found</span>
                        } />
                )
            }
            {
                filterTagsOnSearch.length === 0 && tagsExcludingAll.length !== 0 && (
                    <EmptyPlaceHolder
                        muiIcon={
                            <StyleOutlinedIcon sx={{ fontSize: 66 }}
                                className='text-slate-400' />
                        }
                        text={
                            <span className='text-slate-400'>No Tags Found</span>
                        } />
                )
            }
            {
                filterTagsOnSearch.map((tag) => (
                    <SingleTag tag={tag} key={tag._id} />
                ))
            }


        </div>
    )
}

function SingleTag({ tag }: { tag: SingleTagType }) {

    const { darkModeObject: { darkMode }, selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit }, openNewTagsWindowObject: { setOpenNewTagsWindow }, allTagsObject: { alltags, setAllTags }, allNotesObject: { allNotes, setAllNotes }, tagsClickedObject: {tagsClicked, setTagsClicked} } = useGlobalContext();

    const openTagWindow = (tag: SingleTagType) => {
        setOpenNewTagsWindow(true);
        setSelectedTagToEdit(tag);
    }

    function countTags(tag: SingleTagType) {
        let count = 0;
        allNotes.forEach((note) => {
            if (note.tags.some((t) => t.name === tag.name)) {
                count++;
            }
        });
        return count;
    }

    return (
        <div className={`${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} p-2 rounded-lg flex gap-3 items-center justify-between px-4`}>
            <div className='flex gap-3 items-center'>
                <DragIndicatorOutlined className='text-slate-400 cursor-pointer' />
                <div className='w-2 h-2 bg-purple-600 rounded-full'></div>
                <div className='flex flex-col'>
                    <span className='font-bold'>{tag.name}</span>
                    <span className='text-slate-400 text-[12px]'>{countTags(tag)} Snippets</span>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <div className='rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300'
                    onClick={() => openTagWindow(tag)}>
                    <EditRounded
                        className='text-slate-400' sx={{ fontSize: 15 }} />
                </div>
                <div className='rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300'
                    onClick={() => deleteTag(tag, alltags, setAllTags, allNotes, setAllNotes, tagsClicked, setTagsClicked)}>
                    <DeleteRounded className='text-red-500' sx={{ fontSize: 15 }} />
                </div>

            </div>
        </div>
    )
};

function deleteTag(tag: SingleTagType, alltags: SingleTagType[], setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>, allNotes: singleNoteType[], setAllNotes: React.Dispatch<React.SetStateAction<singleNoteType[]>>, tagsClicked: string[], setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>) {

    setTagsClicked(
        tagsClicked.filter((t) => t.toLocaleLowerCase() !== tag.name.toLocaleLowerCase())
    );

    try {
        const tagNameLower = tag.name.toLocaleLowerCase();
        setAllTags(alltags.filter(t => t.name.toLocaleLowerCase() !== tagNameLower));

        setAllNotes(allNotes.map(note => ({
            ...note,
            tags: note.tags.filter(t => t.name.toLocaleLowerCase() !== tagNameLower)
        })));

        toast.success("Tag has been deleted successfully");
    } catch (error) {
        console.log(error);

    }
}