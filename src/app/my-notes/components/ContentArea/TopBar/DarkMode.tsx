"use client"

import { useGlobalContext } from "../../../../../../ContextApi"

function DarkMode() {
    const {darkModeObject: {darkMode,setDarkMode}} = useGlobalContext();
    
    function handleClickedDarkMode(index: number){
        const updateDarkMode = darkMode.map((mode,i) => {
            if(i === index){
                return {...mode, isSelected: true};
            } else {
                return {...mode, isSelected: false};
            }
        })
        setDarkMode(updateDarkMode);
    }

    return(
        <div className="bg-slate-100 h-[36px] w-[74px] rounded-3xl flex items-center gap-2 pl-[5px] ">
            {
                darkMode.map((item,index) => {
                    return (
                        <div key={index} className={`${item.isSelected ? "bg-purple-600 text-white" : "bg-slate-100 text-purple-600"} w-7 h-7 flex items-center justify-center rounded-full top-[4px] p-1 left-1 cursor-pointer select-none`}
                        onClick={() => handleClickedDarkMode(index)}>
                            {item.icon}
                        </div>
                    )
                })
            }
        </div>
    )
};

export default DarkMode;