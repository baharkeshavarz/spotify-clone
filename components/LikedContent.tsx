"use client";

import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import useOnPlay from '@/hooks/useOnPlay';

interface LikedContentProps {
    songs: Song[],
}

const LikedContent: React.FC<LikedContentProps> = ({songs}) => {
   const { user } = useUser();
   const router = useRouter();
   const onPlay = useOnPlay(songs);

   useEffect(() => {
       if (!user) {
          router.replace("/")
       }
   }, [user])
 
   if (songs.length === 0) {
    return (
        <div className="w-full flex text-neutral-400 px-6">
            No Liked Songs!
        </div>
    )
    }   
  return (
    < div className="flex flex-col px-6">
      {songs.map(song => (
                <div
                      className="flex items-center gap-x-4 w-full"
                      key={song.id}
                  >
                  <MediaItem
                       data={song}
                       onClick={(id: string) => onPlay(id)} 
                   />

                   <LikeButton songId={song.id}/>
                 </div>
      ))}
   </div>
  )
}

export default LikedContent