"use client"

import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../../../../ContextApi"
import { SingleCodeLanguageType, singleNoteType, SingleTagType } from "@/app/Types";
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { allLanguages } from "@/app/localData/Languages";

// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools";


function ContentNote() {

    const { openContentNoteObject: { openContentNote }, isMobileObject: { isMobile }, selectedNoteObject: { selectedNote }, allNotesObject: { allNotes, setAllNotes }, isNewNoteObject: { isNewNote, setIsNewNote }, darkModeObject: { darkMode }, selectedLanguageObject: { selectedLanguage, setSelectedLanguage } } = useGlobalContext();

    const [singleNote, setSingleNote] = useState<singleNoteType | undefined>(undefined);
    // Whenever we open a note (new or existing), load it
    useEffect(() => {
        if (openContentNote) {
            if (selectedNote) {
                setSingleNote(selectedNote);
            }
        }
    }, [openContentNote, selectedNote])
    // If it's a new note, add it immediately
    useEffect(() => {
        if (isNewNote) {
            if (singleNote && singleNote.title !== "") {
                const updateAllNotes = ([...allNotes, singleNote])
                // sort all notes by date
                const sortedAllNotes = updateAllNotes.sort((a,b) => {
                    return (
                        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
                    )
                });
                setAllNotes(sortedAllNotes);
                setIsNewNote(false);
            }
        }
    }, [singleNote])

    useEffect(() => {
        console.log("Dark mode updated:", darkMode);
    }, [darkMode]);

    // Update language in current note
    useEffect(() => {
        if (selectedLanguage && singleNote) {
            const newLanguage = selectedLanguage.name;
            const updateSingleNote: singleNoteType = {
                ...singleNote,
                language: newLanguage,
            };

            const updateAllNotes = allNotes.map((note) => {
                if (note._id === singleNote._id) {
                    return updateSingleNote;
                }
                return note;
            })

            setAllNotes(updateAllNotes);
            setSingleNote(updateSingleNote);
        }
    }, [selectedLanguage])

    return (
        <div className={`border ${isMobile ? "w-4/5 mt-[50%] shadow-lg h-[1040px]" : "w-1/2"} z-502  p-3 rounded-lg ${openContentNote ? "block" : "hidden"} ${isMobile ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""} ${darkMode[1].isSelected ? "bg-slate-700" : "bg-gray-100"}`}>
            {
                singleNote && (
                    <ContentNoteHeader singleNote={singleNote} setSingleNote={setSingleNote} />
                )

            }
            <NoteTags singleNote={singleNote} setSingleNote={setSingleNote} />
            <Description singleNote={singleNote} setSingleNote={setSingleNote} />
            <CodeBlock singleNote={singleNote} setSingleNote={setSingleNote} />
        </div>
    )
}

export default ContentNote;

function ContentNoteHeader({ singleNote, setSingleNote }: { singleNote: singleNoteType, setSingleNote: React.Dispatch<React.SetStateAction<singleNoteType | undefined>> }) {

    const { allNotesObject: { allNotes, setAllNotes }, isNewNoteObject: { setIsNewNote }, openContentNoteObject: { openContentNote, setOpenContentNote }, darkModeObject: { darkMode } } = useGlobalContext();
    const [focus, setFocus] = useState(false);
    const textRef = useRef<HTMLTextAreaElement>(null);

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

    useEffect(() => {
        if(openContentNote){
            textRef.current?.focus();
            setFocus(true);
        }
    },[openContentNote])
    useEffect(() => {
        if(singleNote.title !== ""){
            setFocus(true);
        }
    },[singleNote.title])
    
    return (
        <div className="flex justify-between items-center gap-8 mb-4">
            <div className="flex gap-2 w-full items-center">
                <TitleOutlinedIcon sx={{ fontSize: 19 }} className={`${focus ? "text-purple-600" : "text-slate-400"}  mt-[4px]${darkMode[1].isSelected ? "text-white" : "text-slate-400"}`} />

                <textarea
                    ref={textRef}
                    placeholder="New Title..."
                    value={singleNote.title}
                    onChange={onUpdateTitle}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    onMouseEnter={() => setFocus(true)}
                    onMouseLeave={() => setFocus(false)}
                    className={` ${darkMode[1].isSelected ? "text-white" : "text-black"} font-bold text-xl outline-none resize-none overflow-hidden w-full bg-transparent min-h-0 leading-none py-0`}
                    rows={1}
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

function NoteTags({ singleNote, setSingleNote }: { singleNote: singleNoteType | undefined, setSingleNote: React.Dispatch<React.SetStateAction<singleNoteType | undefined>> }) {
    const [hovered, setHovered] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    const { selctedTagsObject: { selectedTags, setSelectedTags }, allNotesObject: { allNotes, setAllNotes }, } = useGlobalContext();

    useEffect(() => {
        if (isOpened) {
            setHovered(true);
        }
    }, [isOpened])

    function onClickedTag(tag: SingleTagType) {
        if (selectedTags.some((t) => t.name === tag.name)) {
            setSelectedTags(selectedTags.filter((t) => t.name !== tag.name));
        }
        else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    useEffect(() => {
        if (!singleNote) return;
        const newSingleNote = { ...singleNote, tags: selectedTags };
        const newAllNotes = allNotes.map((note) => {
            if (note._id === singleNote?._id) {
                return newSingleNote;
            }

            return note;
        });

        setAllNotes(newAllNotes);
        setSingleNote(newSingleNote);
    }, [selectedTags])

    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setIsOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div className="flex text-[13px] items-center gap-2"
            ref={menuRef}>
            <StyleOutlinedIcon sx={{ fontSize: 19 }} className={`${hovered ? "text-purple-600" : "text-slate-400"}`} />
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                    if (!isOpened) setHovered(false)
                }}
                className="flex justify-between w-full relative"
            >
                <div className="flex gap-2 items-center flex-wrap">
                    {
                        singleNote?.tags.length === 0 ? <div className="bg-slate-100 text-slate-400 p-1 px-2 rounded-md">
                            Not tags
                        </div> :
                            singleNote?.tags.map((tag) => (
                                <div key={tag._id} className="bg-slate-100 text-slate-400 p-1 px-2 rounded-md">
                                    {tag.name}
                                </div>
                            ))
                    }
                    {
                        hovered && (
                            <EditOutlinedIcon sx={{ fontSize: 19 }}
                                className="text-slate-400 cursor-pointer"
                                onClick={() => setIsOpened(!isOpened)} />
                        )
                    }
                </div>
                {isOpened && <TagsMenu onClickedTag={onClickedTag} />}
            </div>
        </div>

    )
}

function TagsMenu({ onClickedTag }: { onClickedTag: (tag: SingleTagType) => void }) {
    const { allTagsObject: { alltags }, selctedTagsObject: { selectedTags } } = useGlobalContext();

    return (
        <ul className="absolute top-10 bg-slate-100 w-[60%] p-3 rounded-md flex flex-col gap-2">
            {
                alltags.map((tag) => (
                    <li key={tag._id}
                        onClick={() => onClickedTag(tag)}
                        className={`${selectedTags.some((t) => t.name.toLowerCase() === tag.name.toLocaleLowerCase()) ? "bg-slate-300" : ""}
                    p-1 px-2 select-none cursor-pointer hover:bg-slate-300 text-slate-500 rounded-md transition-all`}>
                        {tag.name}
                    </li>
                ))
            }
        </ul>
    )
}

function Description({ singleNote, setSingleNote }: { singleNote: singleNoteType | undefined, setSingleNote: React.Dispatch<React.SetStateAction<singleNoteType | undefined>> }) {
    const { darkModeObject: { darkMode }, allNotesObject: { allNotes, setAllNotes } } = useGlobalContext();

    const [isHovered, setIsHovered] = useState(false);

    function onUpdateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (!singleNote) return;
        const newSingleNote = { ...singleNote, description: event.target.value };
        setSingleNote(newSingleNote);

        const newAllNotes = allNotes.map((note) => {
            if (note._id === singleNote._id) {
                return newSingleNote;
            }

            return note;
        })

        setAllNotes(newAllNotes);
    }


    return (
        <div className="flex gap-2 text-[12px] mt-8">
            <DescriptionOutlinedIcon sx={{ fontSize: 18 }}
                className={`mt-[9px] ${isHovered ? "text-purple-600" : "text-slate-400"}`} />

            <textarea
                value={singleNote?.description}
                onChange={onUpdateDescription}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                placeholder="New Description..."
                className={`text-sm outline-none border ${isHovered ? "border-purple-600" : ""} rounded-lg p-2 w-full ${darkMode[1].isSelected ? "text-white" : "text-gray-500"}`}
            />
        </div>
    )
}

function CodeBlock({ singleNote, setSingleNote }: { singleNote: singleNoteType | undefined, setSingleNote: React.Dispatch<React.SetStateAction<singleNoteType | undefined>> }) {
    const [code, setCode] = useState(`function onLoad(editor) {
  console.log("i've loaded");
}`)

    const [isHovered, setIsHovered] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const { darkModeObject: { darkMode }, selectedLanguageObject: { selectedLanguage, setSelectedLanguage }, selectedNoteObject: { selectedNote }, allNotesObject: { allNotes, setAllNotes } } = useGlobalContext();

    useEffect(() => {
        if (selectedNote) {
            if (selectedNote.language === "") {
                setSelectedLanguage(allLanguages[0]);
                return;
            }
            const findLanguage = allLanguages.find((language) => language.name.toLowerCase() === selectedNote.language.toLocaleLowerCase());

            if (findLanguage) {
                setSelectedLanguage(findLanguage);
            }
        }
    }, [selectedNote])

    const handleChange = (code: string) => {
        if (!singleNote) {
            return;
        }
        const newSingleNote = { ...singleNote, code: code };
        const updateAllNotes = allNotes.map((note) => {
            if (note._id === singleNote._id) {
                return newSingleNote;
            }
            return note;
        });
        setAllNotes(updateAllNotes);
        setSingleNote(newSingleNote)
    }

    function clickedCopyBtn() {
        if (!singleNote) {
            return;
        }
        navigator.clipboard.writeText(singleNote.code)
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1200);
    }

    return (
        <div className="flex gap-2 text-[12px] text-slate-400 mt-8">
            <CodeOutlinedIcon sx={{ fontSize: 18 }}
                className={`mt-[9px] ${isHovered ? "text-purple-600" : "text-slate=400"}`} />
            <div className={`${isHovered ? "border-purple-600" : ""} border rounded-lg p-3 pt-16 w-full relative`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute top-4 right-4 z-50">
                    <IconButton disabled={isCopied}>
                        {
                            isCopied ? <DoneAllIcon sx={{ fontSize: 18 }}
                                className={`${darkMode[1].isSelected ? "text-white" : "text-slate-400"}`} /> : <ContentCopyOutlinedIcon
                                onClick={() => clickedCopyBtn()}
                                sx={{ fontSize: 18 }}
                                className={`${darkMode[1].isSelected ? "text-white" : "text-slate-400"}`} />
                        }

                    </IconButton>
                </div>
                {/* Language dropdown */}
                <div
                    onClick={() => setIsOpened(!isOpened)}
                    className={`flex gap-2 justify-between bg-slate-100 p-[6px] px-3 rounded-md items-center text-[12px] mt-3 absolute top-1 left-3 ${darkMode[1].isSelected ? "bg-slate-600 text-white" : "bg-sky-100 text-slate-400"}cursor-pointer`}>
                    <div className="flex gap-1 items-center cursor-pointer">
                        {selectedLanguage?.icon}
                        <span className="mt-[1px]">{selectedLanguage?.name}</span>
                    </div>
                    {isOpened ? (<KeyboardArrowUpOutlinedIcon sx={{ fontSize: 18 }} />) : (
                        <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 18 }} />
                    )}
                </div>
                {isOpened && <LanguageMenu />}

                <AceEditor
                    placeholder="Placeholder Text"
                    mode="javascript"
                    theme="tomorrow"
                    name="blah2"
                    width="100%"
                    height="620px"
                    fontSize={14}
                    lineHeight={19}
                    showPrintMargin={false}
                    showGutter={false}
                    highlightActiveLine={false}
                    value={singleNote?.code}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: false,
                        tabSize: 2,
                    }}

                    onChange={handleChange}

                    className={`${darkMode[1].isSelected ? "bg-transparent text-white" : "bg-white"}`} />
            </div>
        </div>
    )

    function LanguageMenu() {
        const textRef = useRef<HTMLInputElement>(null);
        const [searchQuery, setSearchQuery] = useState("");

        useEffect(() => {
            textRef.current?.focus();
        }, [isOpened]);

        const [filteredLanguages, setFilteredLanguages] = useState(allLanguages);
        const menuRef = useRef<HTMLDivElement>(null);
        const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value.toLowerCase());
        };

        useEffect(() => {
            const filtered = allLanguages.filter((language) => language.name.toLowerCase().includes(searchQuery));

            setFilteredLanguages(filtered);
        }, [searchQuery]);

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpened(false);
            }
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }, []);

        function clickedLanguage(language: SingleCodeLanguageType) {
            setSelectedLanguage(language);
            setIsOpened(false);
        }

        return (
            <div
                ref={menuRef}
                className={`${darkMode[1].isSelected ? "bg-slate-600" : ""}absolute flex-col gap-2 p-3 h-[220px] w-[250px] rounded-md left03 bg-slate-100 z-50 flex text-slate-400`}>
                <div className={`${darkMode[1].isSelected ? "bg-slate-800" : "bg-slate-200"} p-1 rounded-md flex gap-1 mb-1`}>
                    <SearchIcon />
                    <input ref={textRef} placeholder="Search..." className="bg-transparent outline-none"
                        onChange={onChangeSearch}
                        value={searchQuery} />
                </div>

                <div className="h-40 bg-slate-100 overflow-x-auto">
                    {
                        filteredLanguages.map((language) => (
                            <div
                                onClick={() => clickedLanguage(language)}
                                key={language.id}
                                className={`flex mb-2 gap-2 hover:bg-slate-200 bg-transparent p-[6px] px-3 rounded-md items-center cursor-pointer ${selectedLanguage?.name.toLocaleLowerCase() === language.name.toLowerCase() ? "bg-slate-200" : ""}`}>

                                {language.icon}
                                <span className="mt-[1px]">{language.name}</span>


                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

