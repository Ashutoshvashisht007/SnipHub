"use client";

import React, { createContext, useContext, useState } from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

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
}


interface SidebarMenu {
    id: number;
    name: string;
    isSelected: boolean;
    icons: React.ReactNode
}

interface DarkModeType {
    id: number;
    icon: React.ReactNode;
    isSelected: boolean;
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
        setOpenSidebar: () => {}
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
            icons: <FavoriteBorderIcon sx={{ fontSize: 18 }}/>
        },
        {
            id: 3,
            name: "Trash",
            isSelected: false,
            icons: <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }}/>
        },
        {
            id: 4,
            name: "Log out",
            isSelected: false,
            icons: <LogoutIcon sx={{ fontSize: 18 }}/>
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