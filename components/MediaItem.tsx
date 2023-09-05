import { Song } from '@/types'
import Image from 'next/image';
import React from 'react'

interface MediaItemProps {
    data: Song,
    onClick?: (id: string) => void,
}

const MediaItem:React.FC<MediaItemProps> = ({
    data: song,
    onClick
}) => {

 const handleClick = () => {
    if (onClick) {
       onClick(song.id);
    }
 }

  return (
    <div
         onClick={handleClick}
         className="flex items-center w-full p-2 gap-x-2">
       <div className="relative min-h-[48px] min-w-[48px] ">
          <Image
            src={`/songs/images/${song.image_path}` || "/images/liked.png"}
            fill
            alt={song.title}
            className="object-cover rounded-md"
          />
       </div>
       <div className="flex flex-col overflow-hidden">
         <p className="font-normal text-neutral-200 text-base">{song.title}</p> 
         <p className="font-thin text-neutral-400 text-sm"> By {song.author}</p> 
       </div>
    </div>
  )
}

export default MediaItem
