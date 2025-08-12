"use client";

import React, { useRef, useState } from 'react';
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
        darkModeObject: { darkMode }
    } = useGlobalContext();

    return (
        <div className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} rounded-lg p-3 flex gap-5`}>
            <div className='overflow-x-auto w-full max-w-full'>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={10}
                    freeMode={true}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='bg-purple-600 p-1 rounded-md text-white w-20'>All</SwiperSlide>
                    <SwiperSlide className='text-slate-400'>Slide 2</SwiperSlide>
                    <SwiperSlide className='text-slate-400'>Slide 2</SwiperSlide>
                    <SwiperSlide className='text-slate-400'>Slide 2</SwiperSlide>
                    <SwiperSlide className='text-slate-400'>Slide 2</SwiperSlide>
                    <SwiperSlide className='text-slate-400'>Slide 2</SwiperSlide>
                    <SwiperSlide className='text-slate-400'>Slide 2</SwiperSlide>
                    <SwiperSlide className='text-slate-400'>Slide 2</SwiperSlide>
                    
                </Swiper>
            </div>
            <button className='bg-purple-600 p-1 rounded-md px-3 flex gap-1 items-center text-white'>
                <AddOutlinedIcon sx={{fontSize: 18}} />
                <span>Tag</span>
            </button>

        </div>
    );
}
