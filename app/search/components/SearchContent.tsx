"use client"
import { Song } from '@/types';
import React from 'react';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
  
  if (songs.length === 0) {
    return (
       <div className="flex w-full text-neutral-400">
         No Songs Found!
       </div>
    )
  }

  const onPlay = useOnPlay(songs)

  return (
    <div className="flex flex-col px-6">
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

export default SearchContent
