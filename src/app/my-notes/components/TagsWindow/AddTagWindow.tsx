"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../../../../ContextApi';
import CloseIcon from '@mui/icons-material/Close';
import { singleNoteType, SingleTagType } from '@/app/Types';
import { v4 as uuidv4 } from "uuid";
import toast from 'react-hot-toast';
import { ErrorOutlineOutlined } from '@mui/icons-material';

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

    const { openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow }, darkModeObject: { darkMode }, allTagsObject: { alltags, setAllTags }, selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit }, allNotesObject: { allNotes, setAllNotes } } = useGlobalContext();

    const [tagName, setTagName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setErrorMessage("");
        setTagName(newVal);
    }

    useEffect(() => {
        if (openNewTagsWindow) {
            setTagName("");
            setErrorMessage("");
        }
    }, [openNewTagsWindow]);

    useEffect(() => {
        if (selectedTagToEdit) {
            setTagName(selectedTagToEdit.name);
        }
    }, [selectedTagToEdit])

    const handleAddTag = () => {
        if (tagName.trim().length === 0) {
            setErrorMessage("Tag name is empty");
            return;
        }

        if (!alltags.some((tag) => tag.name === tagName)) {
            if (!selectedTagToEdit) {
                addNewTagFunction(alltags, setAllTags, setOpenNewTagsWindow, tagName);
            } else {
                handleEditTag(alltags, setAllTags, setOpenNewTagsWindow, selectedTagToEdit, setSelectedTagToEdit, tagName, allNotes, setAllNotes);
            }
        } else {
            setErrorMessage("Tag already exists!");
        }
    };


    return (
        <div
            style={{ left: "0", right: "0", marginLeft: "auto", marginRight: "auto", top: "100px" }}
            className={`${openNewTagsWindow ? "fixed" : "hidden"} 
            z-100 max-sm:w-[350px] w-[500px] p-[25px] rounded-lg shadow-md ${darkMode[1].isSelected ? "bg-slate-600 text-white" : "bg-white border"}`}>
            <Header />
            <AddTagInput
                tagName={tagName}
                onInputChange={onInputChange}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                onSubmit={handleAddTag} />
            <ButtonGroup onSubmit={handleAddTag} />
        </div>
    )
}

function Header() {

    const { openNewTagsWindowObject: { setOpenNewTagsWindow }, selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit } } = useGlobalContext();

    return (
        <div className='flex justify-between items-center rounded-lg'>
            <div className='flex items-center gap-2'>
                <span className='text-[18px] text-slate-600 font-bold'>
                    {selectedTagToEdit ? "Edit Tag" : "Add New Tag"}
                </span>
            </div>
            <div>
                <CloseIcon sx={{ fontSize: 15 }}
                    className='text-slate-400 cursor-pointer'
                    onClick={() => { setOpenNewTagsWindow(false), setSelectedTagToEdit(null) }} />
            </div>
        </div>
    )
}

function AddTagInput({ tagName, onInputChange, errorMessage, setErrorMessage, onSubmit }: {
    tagName: string,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    onSubmit: () => void
}) {
    const { openNewTagsWindowObject: { openNewTagsWindow }, darkModeObject: { darkMode } } = useGlobalContext();
    const [placeholder, setPlaceholder] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        const rand = Math.floor(Math.random() * tagSuggestions.length);
        setPlaceholder(`e.g. ${tagSuggestions[rand]}`);
    }, [openNewTagsWindow]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [errorMessage, setErrorMessage])

    return (
        <div className='mt-6'>
            <span className='text-slate-400 text-sm font-semibold'>Tag Name</span>
            <input
                ref={inputRef}
                value={tagName}
                onChange={(e) => onInputChange(e)}
                placeholder={placeholder}
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                className={`${darkMode[1].isSelected ? "bg-slate-700" : "bg-white border"} w-full rounded-md p-2 mt-1 text-[12px]outline-none text-slate-600`} />
            {
                errorMessage.length > 0 && (
                    <div className='text-red-500 flex mt-2 gap-1 items-center'>
                        <ErrorOutlineOutlined className='text-[13px]' />
                        <span className='text-red-500 text-[11px]'>{errorMessage}</span>
                    </div>
                )
            }
        </div>
    )
}

function ButtonGroup({ onSubmit }: {
    onSubmit: () => void
}) {

    const { openNewTagsWindowObject: { setOpenNewTagsWindow }, selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit } } = useGlobalContext();

    return (
        <div className='flex justify-end mt-6 gap-2 text-[12px]'>
            <button className='px-4 py-2 text-slate-600 border rounded-md hover:bg-slate-100 cursor-pointer'
                onClick={() => {
                    setOpenNewTagsWindow(false);
                    setSelectedTagToEdit(null);
                }}>
                Cancel
            </button>
            <button className='px-4 py-2 text-white bg-green-400 rounded-md hover:bg-green-500 cursor-pointer'
                onClick={onSubmit}>{selectedTagToEdit ? "Edit Tag" : "Add Tag"}</button>
        </div>
    )
}

function addNewTagFunction(allTags: SingleTagType[], setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>, setOpenNewTagsWindow: React.Dispatch<React.SetStateAction<boolean>>, tagName: string) {
    const newTag = { _id: uuidv4(), name: tagName };
    try {
        setAllTags([...allTags, newTag]);
        setOpenNewTagsWindow(false);
        toast.success("Tag has been added successfully");
    } catch (error) {
        console.log(error);
    }
}

function handleEditTag(allTags: SingleTagType[], setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>, setOpenNewTagsWindow: React.Dispatch<React.SetStateAction<boolean>>, selectedTagToEdit: SingleTagType, setSelectedTagToEdit: React.Dispatch<React.SetStateAction<SingleTagType | null>>, tagName: string, allNotes: singleNoteType[], setAllNotes: React.Dispatch<React.SetStateAction<singleNoteType[]>>
) {
    if (!selectedTagToEdit) return;

    const selectedTagNameLower = selectedTagToEdit.name.toLowerCase();

    const updatedAllTags = allTags.map(tag =>
        tag._id === selectedTagToEdit._id
            ? { ...tag, name: tagName }
            : tag
    );

    const updatedAllNotes = allNotes.map(note => {
        const hasTag = note.tags.some(
            tag => tag.name.toLowerCase() === selectedTagNameLower
        );

        if (!hasTag) return note;

        return {
            ...note,
            tags: note.tags.map(tag =>
                tag.name.toLowerCase() === selectedTagNameLower
                    ? { ...tag, name: tagName }
                    : tag
            )
        };
    });

    setAllTags(() => updatedAllTags);
    setAllNotes(() => updatedAllNotes);
    setOpenNewTagsWindow(false);
    setSelectedTagToEdit(null);
    toast.success("✅ Tag has been successfully edited!");
}

export default AddTagWindow
