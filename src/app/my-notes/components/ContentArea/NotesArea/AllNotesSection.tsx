import React from 'react'
import { useGlobalContext } from '../../../../../../ContextApi'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SyntaxHighlighter from 'react-syntax-highlighter';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';
import { materialLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SiJavascript } from 'react-icons/si';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const AllNotesSection = () => {
    return (
        <div className='mt-5 flex flex-wrap gap-4'>
            <SingleNote />
            <SingleNote />
            <SingleNote />
            <SingleNote />
        </div>
    )
}

export default AllNotesSection

function SingleNote() {
    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} max-sm:w-full w-[320px] rounded-md py-4`}>
            <NoteHeader />
            <NoteDate />
            <NoteTags />
            <NoteDescription />
            <CodeBlock langauge="javascript" /> 
            <NoteFooter />
        </div>
    )
}

function NoteHeader() {
    return (
        <div className='flex justify-between mx-4'>
            <span className='font-bold text-lg w-[87%]'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, esse animi. Et quasi ut fugit!
            </span>

            <FavoriteBorderOutlinedIcon className="text-slate-400 cursor-pointer" />
        </div>
    )
}

function NoteTags() {
    return (
        <div className='text-slate-500 text-[11px] mx-4 flex-wrap flex gap-1 mt-4'>
            <span className='bg-purple-100 text-purple-600 p-1 rounded-md px-2'>
                functions
            </span>
            <span className='bg-purple-100 text-purple-600 p-1 rounded-md px-2'>
                functions
            </span>
            <span className='bg-purple-100 text-purple-600 p-1 rounded-md px-2'>
                functions
            </span>
        </div>
    )
}

function NoteDate() {
    return (
        <div className='text-slate-500 text-[11px] mx-4 mt-1 flex gap-1 font-light'>
            <span className=''>12th March 2025</span>
        </div>
    )
}

function NoteDescription() {

    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className={`${darkMode[1].isSelected ? "text-slate-300" : ""} text-slate-600 text-[13px] mt-4 mx-4`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quos aperiam totam neque? Numquam dolorem aliquam, incidunt inventore tenetur quam.
        </div>
    )
}

interface CodeBlockProps {
    langauge: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ langauge }) => {

    const { darkModeObject: { darkMode } } = useGlobalContext();

    const codeString = `
    #include <bits/stdc++.h>
    using namespace std;
    
    int main(){
    cout<<"Hello World";
    return 0;
}}`;

    return (
        <div className='rounded-md overflow-hidden text-sm'>
            <SyntaxHighlighter language={language} style={darkMode[1].isSelected ? oneDark : materialLight}>
                {codeString}
            </SyntaxHighlighter>
        </div>
    )
}

function NoteFooter() {
    return (
        <div className='flex justify-between text-[13px] text-slate-400 mx-4 mt-3'>
            <div className='flex gap-1 items-center'>
                <SiJavascript size={15} className='mb-[2px]' />
                Javascript
            </div>
            <DeleteRoundedIcon sx={{fontSize: 17}} className="cursor-pointer" />
        </div>
    )
}