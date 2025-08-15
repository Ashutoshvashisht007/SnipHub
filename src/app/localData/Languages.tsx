import React from 'react'
import { SiC, SiCplusplus, SiFlutter, SiGo, SiJavascript, SiKotlin, SiPhp, SiPython, SiRuby, SiRust, SiShell, SiSwift, SiTypescript } from 'react-icons/si';
import { FaJava } from "react-icons/fa";

import { v4 as uuidv4 } from "uuid";

export const allLanguages = [
    {
        id: uuidv4(),
        name: "C",
        icon: <SiC size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "C++",
        icon: <SiCplusplus size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Flutter",
        icon: <SiFlutter size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Go",
        icon: <SiGo size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Java",
        icon: <FaJava size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Javascript",
        icon: <SiJavascript size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Kotlin",
        icon: <SiKotlin size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "PHP",
        icon: <SiPhp size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Python",
        icon: <SiPython size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Ruby",
        icon: <SiRuby size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Rust",
        icon: <SiRust size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Shell",
        icon: <SiShell size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Swift",
        icon: <SiSwift size={15} className='text-slate=400' />
    },
    {
        id: uuidv4(),
        name: "Typescript",
        icon: <SiTypescript size={15} className='text-slate=400' />
    }
]

const Languages = () => {
    return (
        <div>Languages</div>
    )
}

export default Languages