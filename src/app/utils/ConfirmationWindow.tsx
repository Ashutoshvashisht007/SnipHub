import React, { useState } from 'react'
import { useGlobalContext } from '../../../ContextApi'
import toast from 'react-hot-toast';

const ConfirmationWindow = () => {

    const { openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmationWindow }, allNotesObject: { setAllNotes }, selectedNoteObject: { selectedNote, setSelectedNote } } = useGlobalContext();

    const [isDeleting, setIsDeleting] = useState(false);

    const deleteTheSnippet = async () => {
        if (selectedNote) {
            setIsDeleting(true);

            try {
                const res = await fetch(`/api/snippets/${selectedNote._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                setAllNotes((prevNotes) => prevNotes.filter((note) => note._id !== selectedNote._id));
                setOpenConfirmationWindow(false);
                setSelectedNote(null);

                toast.success("Snippet has been deleted");
            } catch (error) {
                console.log("Error whilte deleting the snippet,", error); 
                toast.error("Failed to delete the snippet, please try again later");
            }
            finally{
                setIsDeleting(false);
            }


        }
    }

    return (
        <div style={{ left: "0", right: "0", marginLeft: "auto", marginRight: "auto", top: "40%", transform: "translateY(-50%)" }}
            className={`shadow-md rounded-md md:w-[450px] w-[310px] ${openConfirmationWindow ? "fixed z-60" : "hidden"} bg-white py-8 pt-10 p-3`}
        >
            <div className='flex flex-col items-center gap-2'>
                <span className='font-bold text-xl'>{`Are you sure?`}</span>
                <span className='text-center text-[13px] opacity-85 px-8'>Are you sure you want to delete this snippet? This action cannote be undone.</span>
            </div>

            <div className='flex gap-2 mt-5'>
                <button onClick={() => setOpenConfirmationWindow(false)} className='text-[12px] cursor-pointer w-full px-10 p-3 rounded-md bg-green-300 hover:bg-green-400'>Cancel</button>
                <button className={`w-full px-10 text-[12px] p-3 text-white bg-red-400 rounded-md cursor-pointer hover:bg-red-500`}
                    onClick={deleteTheSnippet}>{isDeleting ? "Deleting...." : "Delete"}</button>
            </div>
        </div>
    )
}

export default ConfirmationWindow