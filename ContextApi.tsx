"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DarkModeType, SidebarMenu, singleNoteType } from "@/app/Types";

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
        {
            id: 4,
            name: "Log out",
            isSelected: false,
            icons: <LogoutIcon sx={{ fontSize: 18 }} />
        }
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
    const [selectedNote,setSelectedNote] = useState<singleNoteType | null>(null);

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
        function updateAllNotes() {
            const allNotes = [{
                id: "1",
                title: "Sample Note",
                isFavorite: false,
                tags: ["tag1", "tag2"],
                description: "This is a sample note description.",
                code: `console.log('Hello, world!');
                functions a(){
                console.log("b");}`,
                language: "javascript",
                creationDate: new Date().toISOString()
            },
            {
                id: "2",
                title: "Another Note",
                isFavorite: true,
                tags: ["tag3"],
                description: "This is another note description.",
                code: `function greet() {
                    console.log('Hello!');
                }`,
                language: "javascript",
                creationDate: new Date().toISOString()
            }
            ];

            setTimeout(() => {
                setAllNotes(allNotes);
            }, 1200);
        }

        updateAllNotes();

    }, [])

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