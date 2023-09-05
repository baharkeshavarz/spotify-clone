import useAuthModal from '@/hooks/useAuthModal';
import useUploadModel from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types';
import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from './MediaItem';

interface LibraryProps {
   songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
   songs
}) => {
  const authModel = useAuthModal();
  const uploadModel = useUploadModel();

  const {user} = useUser();
  const onClick = () => {
      if (!user) {
        return authModel.onOpen();
      }

      return uploadModel.onOpen();
  }

  return (
    <div className="flex flex-col p-5">
        <div className="flex justify-between">
            <div className="flex align-items gap-x-2">
                <TbPlaylist className="text-neutral-400" size={26} />
                <p className="text-neutral-400 font-medium text-md">Your Library</p>
           </div>
            <AiOutlinePlus
               size={20}
               onClick={onClick}
               className="text-neutral-400 cursor-pointer transition hover:text-white"
            /> 
        </div>

        <div className="flex flex-col gap-y-2 pt-5 px-3">
            { songs && songs.map(song => 
                           <MediaItem
                               key={song.id}
                               data={song}
                               onClick={() => {}}
                           />
           )}
        </div>
    </div>
  )
}

export default Library
