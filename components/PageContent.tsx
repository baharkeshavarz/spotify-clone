"use client";

import { Song } from '@/types';
import React from 'react'
import SongItem from './SongItem';

interface PageContentProps {
    songs: Song[];
}

const PageContent:React.FC<PageContentProps> = ({
    songs
}) => {
  
  if (songs.length === 0) {
    return (
       <div className="mt-4 text-neutral-400">
         No songs available.
       </div>
    )
  }

  return (
    <div className="grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-3
                    lg:grid-cols-7
                    gap-5
                    mt-10
                   ">
        { songs.map(song => (
                      <SongItem 
                           key={song.id} 
                           data={song}
                           onClick={(id: string) => {}} 
                     />
       ))}
    </div>
  )
}

export default PageContent
