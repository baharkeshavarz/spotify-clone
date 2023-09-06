"use client";

import { Song } from '@/types'
import React, { useEffect, useState } from 'react'
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import usePlayer from '@/hooks/usePlayer'; 
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Slider from "./Slider";
import useSound from 'use-sound';

interface PlayerContentProps {
    song: Song;
}

export const PlayerContent: React.FC<PlayerContentProps> = ({
    song
}) => {

  const [ isPlaying, setIsPlaying ] = useState(true);
  const [ volume, setVoluem ] = useState(1);
  const player = usePlayer();
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;
     
    const currentIndex = player.ids.findIndex(id => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(prevSong);
  }

  const onPlayNext = () => {
     if (player.ids.length === 0) return;

     const currentIndex = player.ids.findIndex(id => id === player.activeId);
     const nextSong = player.ids[currentIndex + 1];

     if (!nextSong) {
       return player.setId(player.ids[0])
     }

     player.setId(nextSong);
  }

  const songUrl = `/songs/musics/${song.song_path}`;
  const [ play, { pause, sound } ] = useSound(
    songUrl,
     {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
          setIsPlaying(false);
          onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3']
     }
  )

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    }
  }, [sound])

 const handlePlay = () => {
   if (!isPlaying) {
      play();
   } else {
     pause();
   }
 }

 const toggleMute = () => {
   if (volume === 0) {
     setVoluem(1)
   } else {
     setVoluem(0)
   }
 }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-full">
           {/* {JSON.stringify(songUrl)} */}
          <div className="flex items-center justify-start w-full gap-x-4">
                <MediaItem data={song}/>
                <LikeButton songId={song._id} />
          </div>

          {/* mobile view */}
          <div className="md:hidden flex justify-center items-center w-full">
               <div 
                   className="flex rounded-full w-8 h-8 p-1 justify-center bg-white cursor-pointer"
                   onClick={handlePlay}
                >
                  <Icon size={26} className="text-black" />
               </div>
          </div>

          {/* desktop view */}
          <div className="hidden md:flex justify-center items-center w-full md:col-span-2 lg:col-span-3">
             <div className="flex max-w-[772px] justify-center items-center gap-x-6">
                 <AiFillStepBackward 
                      size={26} 
                      onClick={onPlayPrevious}
                      className="text-neutral-400 hover:text-white transition cursor-pointer"
                    />
                  <div className="flex rounded-full w-8 h-8 p-1 justify-center bg-white cursor-pointer" 
                      onClick={handlePlay}>
                      <Icon 
                           size={26} 
                           className="text-black"
                          />
                   </div>
                  <AiFillStepForward 
                       size={26} 
                       onClick={onPlayNext}
                       className="text-neutral-400 hover:text-white transition cursor-pointer"
                    />
             </div>
          </div>

          <div className="hidden md:flex justify-center items-center w-full">
              <div className="flex justify-center items-center w-[120px] gap-x-5 cursor-pointer">
                  <VolumeIcon
                      onClick={toggleMute}
                      size={30} 
                      className="text-neutral-400"
                   />
                  <Slider
                      value={volume} 
                      onChange={(value) => setVoluem(value)}
                    />
              </div>
          </div>
    </div>
  )
}
