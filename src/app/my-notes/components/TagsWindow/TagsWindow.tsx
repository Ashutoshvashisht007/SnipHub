import React from 'react'
import { useGlobalContext } from '../../../../../ContextApi'
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import CloseIcon from '@mui/icons-material/Close';

const TagsWindow = () => {
    const {openTagsWindowObject: {openTagsWindow, setOpenTagsWindow}} = useGlobalContext();
  return (
    <div
    style={{left: "0", right: "0", marginLeft: "auto", marginRight: "auto", top:"30%", transform: "translateY(-50%)"}}
    className={`${openTagsWindow ? "fixed" : "hidden"} border m-20 w-1/2 z-50 p-4 bg-white shadow-md rounded-md`}
    >
        <Header />
    </div>
  )
}

export default TagsWindow

function Header() {

    const {openTagsWindowObject: {openTagsWindow, setOpenTagsWindow}} = useGlobalContext();

    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <StyleOutlinedIcon />
                <span className='text-md font-bold'>Tags</span>
            </div>
            <div onClick={()=> setOpenTagsWindow(false)}>
                <CloseIcon sx={{fontSize: 16}}
                className='text-slate-400 cursor-pointer'/>
            </div>
        </div>
    )
}