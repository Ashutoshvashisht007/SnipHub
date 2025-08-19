import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import React from 'react'
import { useGlobalContext } from '../../../ContextApi';
import { v4 as uuidv4 } from "uuid";

const EmptyPlaceHolder = ({
    muiIcon, text, isNew
}: {
    muiIcon: React.ReactNode;
    text: React.ReactNode;
    isNew?: boolean
}) => {

    const {openContentNoteObject: {setOpenContentNote}, selectedNoteObject: {setSelectedNote}, isNewNoteObject: {isNewNote, setIsNewNote}, shareUserIdObject: {shareUserId} } = useGlobalContext();
    
        const openTheContentNote = () => {
            const newSingleNote = {
                _id: uuidv4(),
                title: "",
                clerkUserId: shareUserId || "",
                creationDate: new Date().toISOString(),
                tags: [],
                description: "",
                code: "",
                isFavorite: false,
                language: "",
                isTrash: false,
            };

            setIsNewNote(true)
            setSelectedNote(newSingleNote);
            setOpenContentNote(true);
        }

  return (
    <div className='w-full h-[510px] pt-20 flex gap-3 flex-col items-center'>
        {muiIcon}
        {text}
        {
            isNew && (
                <button
                onClick={openTheContentNote}
                className='bg-purple-600 p-[8px] px-5 text-sm text-white rounded-md mt-2 justify-center items-center cursor-pointer'>
                    <AddOutlinedIcon sx={{fontSize: 17, color:"white"}} />
                    <span className='ml-1'>Add a new snippet</span>
                </button>
            )
        }
    </div>
  )
}

export default EmptyPlaceHolder