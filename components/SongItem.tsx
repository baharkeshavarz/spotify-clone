"use client"
import { Song } from '@/types';
import Image from 'next/image';
import React from 'react'
import PlayButton from './PlayButton';

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {

  return (
    <div 
        className="flex flex-col rounded-md p-5 relative group hover:bg-neutral-700"
        onClick={() => onClick(data.id)}
     >
      <div className="
           relative 
           aspect-square 
           w-full
           h-full">
         <Image
           src={`/songs/images/${data.image_path}` || "/images/liked.png"}
           fill
           alt={data.title}
           className="object-cover"
         />
      </div>
           
      <p className="text-lg py-3 font-semibold">
         {data.title}
      </p>

      <p className="text-normal font-thin text-neutral-400 w-full">
        By {data.author}
      </p>

      <div className="absolute bottom-24 right-5">
          <PlayButton/>
      </div>
    </div>
  )
}

export default SongItem
