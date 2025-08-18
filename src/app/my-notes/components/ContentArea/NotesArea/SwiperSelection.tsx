"use client";

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { useGlobalContext } from '../../../../../../ContextApi';

export default function SwiperSelection() {

    const {
        darkModeObject: { darkMode }, openNewTagsWindowObject: {setOpenNewTagsWindow}, allTagsObject: {alltags}
    } = useGlobalContext();

    const [tagsSelected,setTagsSelected] = useState<boolean[]>([]);

    useEffect(()=> {
        if(alltags){
            const newTagsSelected = Array(alltags.length).fill(false);
            newTagsSelected[0] = true;
            setTagsSelected(newTagsSelected);
        }
    },[alltags]);

    const handletagClick = (idx: number) => {
        const newTagsSelected = [...tagsSelected];

        if(idx === 0){
            newTagsSelected[0] = true;

            for(let i=1;i<newTagsSelected.length;i++){
                newTagsSelected[i] = false;
            }
            setTagsSelected(newTagsSelected);
            return;
        }
        else{
            newTagsSelected[0] = false;
            newTagsSelected[idx] = !newTagsSelected[idx];
            
            setTagsSelected(newTagsSelected);
        }

        if(newTagsSelected.every((tag)=> !tag)){
            newTagsSelected[0] = true;
            setTagsSelected(newTagsSelected)
        }
    }


    return (
        <div className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} rounded-lg p-3 flex gap-5`}>
            <div className='overflow-x-auto w-full max-w-full'>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    {
                        alltags.map((tag,index) => (
                            <SwiperSlide key={tag._id}
                            className={`${tagsSelected[index] ? "bg-purple-600 text-white" : "bg-white text-gray-400"} p-1 rounded-md w-20`}
                            onClick={()=> handletagClick(index)} >
                                {tag.name}
                            </SwiperSlide>
                        ))
                    } 
                </Swiper>
            </div>
            <button className='bg-purple-600 p-1 rounded-md px-3 flex gap-1 items-center text-white cursor-pointer'
            onClick={()=> setOpenNewTagsWindow(true)}>
                <AddOutlinedIcon sx={{fontSize: 18}} />
                <span>Tag</span>
            </button>

        </div>
    );
}
