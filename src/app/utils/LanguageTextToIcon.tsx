import { FaJava } from "react-icons/fa";
import { 
    SiPython, 
    SiJavascript, 
    SiTypescript,  
    SiCplusplus, 
    SiC, 
    SiPhp, 
    SiGo, 
    SiRuby, 
    SiSwift, 
    SiKotlin, 
    SiHtml5, 
    SiCss3, 
    SiR, 
    SiRust, 
    SiScala,
    SiPerl,
    SiDart
} from "react-icons/si";


function getLanguageToIcon(language: string){
    switch(language){
        case "Python":
            return <SiPython size={15} className="mb-[2px]" />;
        case "JavaScript":
            return <SiJavascript size={15} className="mb-[2px]" />;
        case "TypeScript":
            return <SiTypescript size={15} className="mb-[2px]" />;
        case "Java":
            return <FaJava size={15} className="mb-[2px]" />;
        case "C++":
            return <SiCplusplus size={15} className="mb-[2px]" />;
        case "C":
            return <SiC size={15} className="mb-[2px]" />;
        case "PHP":
            return <SiPhp size={15} className="mb-[2px]" />;
        case "Go":
            return <SiGo size={15} className="mb-[2px]" />;
        case "Ruby":
            return <SiRuby size={15} className="mb-[2px]" />;
        case "Swift":
            return <SiSwift size={15} className="mb-[2px]" />;
        case "Kotlin":
            return <SiKotlin size={15} className="mb-[2px]" />;
        case "HTML":
            return <SiHtml5 size={15} className="mb-[2px]" />;
        case "CSS":
            return <SiCss3 size={15} className="mb-[2px]" />;
        case "R":
            return <SiR size={15} className="mb-[2px]" />;
        case "Rust":
            return <SiRust size={15} className="mb-[2px]" />;
        case "Scala":
            return <SiScala size={15} className="mb-[2px]" />;
        case "Perl":
            return <SiPerl size={15} className="mb-[2px]" />;
        case "Dart":
            return <SiDart size={15} className="mb-[2px]" />;
        default:
            return null;
    }
}

export default getLanguageToIcon;