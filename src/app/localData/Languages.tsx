import React from 'react'
import { SiC, SiCplusplus, SiCss3, SiDart, SiFlutter, SiGo, SiHtml5, SiJavascript, SiKotlin, SiPerl, SiPhp, SiPython, SiR, SiRuby, SiRust, SiScala, SiShell, SiSwift, SiTypescript } from 'react-icons/si';
import { FaJava } from "react-icons/fa";

import { v4 as uuidv4 } from "uuid";

export const allLanguages = [
    { id: uuidv4(), name: "Python", icon: <SiPython size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "JavaScript", icon: <SiJavascript size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "TypeScript", icon: <SiTypescript size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Java", icon: <FaJava size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "C++", icon: <SiCplusplus size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "C", icon: <SiC size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "PHP", icon: <SiPhp size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Go", icon: <SiGo size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Ruby", icon: <SiRuby size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Swift", icon: <SiSwift size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Kotlin", icon: <SiKotlin size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "HTML", icon: <SiHtml5 size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "CSS", icon: <SiCss3 size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "R", icon: <SiR size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Rust", icon: <SiRust size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Scala", icon: <SiScala size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Perl", icon: <SiPerl size={15} className="text-slate-400" /> },
    { id: uuidv4(), name: "Dart", icon: <SiDart size={15} className="text-slate-400" /> }
];

const Languages = () => {
    return (
        <div>Languages</div>
    )
}

export default Languages