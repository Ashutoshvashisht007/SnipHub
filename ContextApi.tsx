"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CodeLanguagesCounterType, DarkModeType, SidebarMenu, SingleCodeLanguageType, singleNoteType, SingleTagType } from "@/app/Types";
import { v4 as uuidv4 } from "uuid";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import { useUser } from "@clerk/nextjs";

interface GlobalContextType {
    sideBarMenuObject: {
        sideBarMenu: SidebarMenu[];
        setSideBarMenu: React.Dispatch<React.SetStateAction<SidebarMenu[]>>;
    };
    darkModeObject: {
        darkMode: DarkModeType[];
        setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>;
    };
    openSideBarObject: {
        openSidebar: boolean;
        setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    };
    openContentNoteObject: {
        openContentNote: boolean;
        setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
    },
    isMobileObject: {
        isMobile: boolean;
        setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
    },
    allNotesObject: {
        allNotes: singleNoteType[];
        setAllNotes: React.Dispatch<React.SetStateAction<singleNoteType[]>>;
    },
    selectedNoteObject: {
        selectedNote: singleNoteType | null,
        setSelectedNote: React.Dispatch<React.SetStateAction<singleNoteType | null>>;
    },
    isNewNoteObject: {
        isNewNote: boolean,
        setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
    },
    allTagsObject: {
        alltags: SingleTagType[],
        setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
    },
    selctedTagsObject: {
        selectedTags: SingleTagType[],
        setSelectedTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
    },
    selectedLanguageObject: {
        selectedLanguage: SingleCodeLanguageType | null,
        setSelectedLanguage: React.Dispatch<React.SetStateAction<SingleCodeLanguageType | null>>
    },
    openConfirmationWindowObject:{
        openConfirmationWindow: boolean,
        setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>;
    },
    codeLanguageCounterObject: {
        codeLanguageCounter: CodeLanguagesCounterType[],
        setCodeLanguageCounter: React.Dispatch<React.SetStateAction<CodeLanguagesCounterType[]>>;
    },
    openTagsWindowObject: {
        openTagsWindow: boolean,
        setOpenTagsWindow: React.Dispatch<React.SetStateAction<boolean>>;
    },
    tagsAndLogoutMenuObject: {
        tagsAndLogoutMenu: SidebarMenu[],
        setTagsAndLogoutMenu: React.Dispatch<React.SetStateAction<SidebarMenu[]>>;
    },
    openNewTagsWindowObject: {
        openNewTagsWindow: boolean,
        setOpenNewTagsWindow: React.Dispatch<React.SetStateAction<boolean>>;
    },
    selectedTagToEditObject: {
        selectedTagToEdit: SingleTagType | null,
        setSelectedTagToEdit: React.Dispatch<React.SetStateAction<SingleTagType | null>>;
    },
    tagsClickedObject: {
        tagsClicked: string[],
        setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>;
    },
    isLoadingObject: {
        isLoading: boolean,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    },
    shareUserIdObject: {
        shareUserId: string,
        setShareUserId: React.Dispatch<React.SetStateAction<string>>;
    }
}

const ContextProvider = createContext<GlobalContextType>({
    sideBarMenuObject: {
        sideBarMenu: [],
        setSideBarMenu: () => { }
    },
    darkModeObject: {
        darkMode: [],
        setDarkMode: () => { }
    },
    openSideBarObject: {
        openSidebar: false,
        setOpenSidebar: () => { }
    },
    openContentNoteObject: {
        openContentNote: false,
        setOpenContentNote: () => { }
    },
    isMobileObject: {
        isMobile: false,
        setIsMobile: () => { }
    },
    allNotesObject: {
        allNotes: [],
        setAllNotes: () => { }
    },
    selectedNoteObject: {
        selectedNote: null,
        setSelectedNote: () => { }
    },
    isNewNoteObject: {
        isNewNote: false,
        setIsNewNote: () => { }
    },
    allTagsObject: {
        alltags: [],
        setAllTags: () => { }
    },
    selctedTagsObject: {
        selectedTags: [],
        setSelectedTags: () => { }
    },
    selectedLanguageObject: {
        selectedLanguage: null,
        setSelectedLanguage: () => { }
    },
    openConfirmationWindowObject: {
        openConfirmationWindow: false,
        setOpenConfirmationWindow: () => {}
    },
    codeLanguageCounterObject: {
        codeLanguageCounter: [],
        setCodeLanguageCounter: ()=> {}
    },
    openTagsWindowObject: {
        openTagsWindow: false,
        setOpenTagsWindow: () => {}
    },
    tagsAndLogoutMenuObject: {
        tagsAndLogoutMenu: [],
        setTagsAndLogoutMenu: ()=> {}
    },
    openNewTagsWindowObject: {
        openNewTagsWindow: false,
        setOpenNewTagsWindow: () => {}
    },
    selectedTagToEditObject: {
        selectedTagToEdit: null,
        setSelectedTagToEdit: ()=> {}
    },
    tagsClickedObject: {
        tagsClicked: [],
        setTagsClicked: ()=> {}
    },
    isLoadingObject: {
        isLoading: true,
        setIsLoading: () => {}
    },
    shareUserIdObject: {
        shareUserId: "",
        setShareUserId: ()=> {}
    }
})

export default function GlobalContextProvider({
    children,
}: { children: React.ReactNode }) {
    const [sideBarMenu, setSideBarMenu] = useState<SidebarMenu[]>([
        {
            id: 1,
            name: "All Snippets",
            isSelected: true,
            icons: <BorderAllIcon sx={{ fontSize: 18 }} />
        },
        {
            id: 2,
            name: "Favorites",
            isSelected: false,
            icons: <FavoriteBorderIcon sx={{ fontSize: 18 }} />
        },
        {
            id: 3,
            name: "Trash",
            isSelected: false,
            icons: <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
        },
    ]);

    const [darkMode, setDarkMode] = useState<DarkModeType[]>([
        {
            id: 1,
            icon: <LightModeIcon sx={{ fontSize: 18 }} />,
            isSelected: true
        },
        {
            id: 2,
            icon: <DarkModeIcon sx={{ fontSize: 18 }} />,
            isSelected: false
        }
    ]);

    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [openContentNote, setOpenContentNode] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [allNotes, setAllNotes] = useState<singleNoteType[]>([]);
    const [selectedNote, setSelectedNote] = useState<singleNoteType | null>(null);
    const [isNewNote, setIsNewNote] = useState(false);
    const [alltags, setAllTags] = useState<SingleTagType[]>([]);
    const [selectedTags, setSelectedTags] = useState<SingleTagType[]>([])
    const [selectedLanguage, setSelectedLanguage] = useState<SingleCodeLanguageType | null>(null);
    const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
    const [codeLanguageCounter, setCodeLanguageCounter] = useState<CodeLanguagesCounterType[]>([]);
    const [openTagsWindow, setOpenTagsWindow] = useState(false);
    const [openNewTagsWindow, setOpenNewTagsWindow] = useState(false);
    const [tagsAndLogoutMenu, setTagsAndLogoutMenu] = useState<SidebarMenu[]>([
        {
            id: 1,
            name: "Tags",
            isSelected: false,
            icons: <StyleOutlinedIcon sx={{fontSize: 18}} />
        },
        {
            id: 2,
            name: "Log Out",
            isSelected: false,
            icons: <StyleOutlinedIcon sx={{fontSize: 18}} />
        },
    ]);
    const [selectedTagToEdit, setSelectedTagToEdit] = useState<SingleTagType | null>(null);
    const [tagsClicked, setTagsClicked] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isLoaded, isSignedIn, user} = useUser();
    const [shareUserId, setShareUserId] = useState<string>("");

    useEffect(()=> {
        if(user){
            setShareUserId(user?.id);
        }
    },[isLoaded,user]);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 640);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const response = await fetch(`/api/snippets?clerkId=${user?.id}`);
                if(!response.ok){
                    throw new Error("Failed to fetch snippets");
                }
                const data: {notes: singleNoteType[]} = await response.json();
                if(data.notes){
                    const sortedAllNotes: singleNoteType[] = data.notes.sort((a,b) => {
                        return (
                            new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
                        );
                    });

                    setAllNotes(sortedAllNotes);
                }
            } catch (error) {
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        }

        const fetchAllTags = async ()=> {
            try {
                const response = await fetch(`/api/tags?clerkId=${user?.id}`);

                if(!response.ok){
                    throw new Error("Failed to fetch tags");
                }

                const data: {tags: SingleTagType[]} = await response.json();
                if(data.tags){
                    const allTag: SingleTagType = {
                        _id: uuidv4(),
                        name: "All",
                        clerkUserId: user?.id || "",
                    };

                    const tempAllTags = [allTag, ...data.tags];

                    setAllTags(tempAllTags);
                }
            } catch (error) {
                console.log(error);
            } finally{
                setIsLoading(false);
            }
        }

        if(isLoaded && isSignedIn){
            fetchAllNotes();
            fetchAllTags();
        }

    }, [user, isLoaded, isSignedIn])

    useEffect(() => {
        setSelectedTags(selectedNote?.tags || []);
    }, [selectedNote])

    useEffect(() => {
        if (openContentNote === false) {
            const filteredNotes = allNotes.filter((note) => {
                return (
                    note.title.trim() !== "" || note.description.trim() !== "" || note.code.trim() !== ""
                )
            });
            setAllNotes(filteredNotes);
        }


        
    }, [openContentNote])

    useEffect(()=> {
        const languageCounts: Record<string,number> = {};
        allNotes.forEach((note)=> {
            const language = note.language.toLowerCase();
            if(languageCounts[language]){
                languageCounts[language]++;
            }else{
                languageCounts[language] = 1;
            }
        });

        const convertedLanguageCounts : CodeLanguagesCounterType[] = Object.entries(languageCounts).map(([language,count]) => ({
            language, count
        })).sort((a,b) => b.count - a.count);

        setCodeLanguageCounter(convertedLanguageCounts);
    }, [allNotes]);

    useEffect(()=> {
        if(openTagsWindow){
            setOpenTagsWindow(false);
            if(tagsAndLogoutMenu[0].isSelected){
                tagsAndLogoutMenu[0].isSelected = false;
            }
        }
    }, [sideBarMenu])


    return (
        <ContextProvider.Provider value={{
            sideBarMenuObject: {
                sideBarMenu,
                setSideBarMenu
            },
            darkModeObject: {
                darkMode,
                setDarkMode
            },
            openSideBarObject: {
                openSidebar,
                setOpenSidebar
            },
            openContentNoteObject: {
                openContentNote,
                setOpenContentNote: setOpenContentNode
            },
            isMobileObject: {
                isMobile,
                setIsMobile
            },
            allNotesObject: {
                allNotes,
                setAllNotes
            },
            selectedNoteObject: {
                selectedNote,
                setSelectedNote
            },
            isNewNoteObject: {
                isNewNote,
                setIsNewNote
            },
            allTagsObject: {
                alltags,
                setAllTags
            },
            selctedTagsObject: {
                selectedTags,
                setSelectedTags
            },
            selectedLanguageObject: {
                selectedLanguage,
                setSelectedLanguage
            },
            openConfirmationWindowObject: {
                openConfirmationWindow,
                setOpenConfirmationWindow
            },
            codeLanguageCounterObject: {
                codeLanguageCounter,
                setCodeLanguageCounter
            },
            openTagsWindowObject: {
                openTagsWindow,
                setOpenTagsWindow
            },
            tagsAndLogoutMenuObject: {
                tagsAndLogoutMenu,
                setTagsAndLogoutMenu
            },
            openNewTagsWindowObject: {
                openNewTagsWindow,
                setOpenNewTagsWindow
            },
            selectedTagToEditObject:{
                selectedTagToEdit,
                setSelectedTagToEdit
            },
            tagsClickedObject: {
                tagsClicked,
                setTagsClicked
            },
            isLoadingObject: {
                isLoading,
                setIsLoading
            },
            shareUserIdObject: {
                shareUserId,
                setShareUserId
            }
        }}>
            {children}
        </ContextProvider.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(ContextProvider);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContenxtProvider");
    }
    return context;
}