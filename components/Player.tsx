"use client"

import usePlayer from '@/hooks/usePlayer';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { PlayerContent } from './PlayerContent';

export const Player = () => {
  const player = usePlayer();
  const [ song, setSong ] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
        try {
            const response = await axios.get(`/api/song?songId=${player.activeId}`);
            if (response && response.data.status === "success") {
                setSong(response.data.song);
            }
          } catch (error) {
             toast.error("Something went wrong!")
          }
    }

    fetchSong();
  }, [player.activeId])

  if (!player.activeId || !song) return;

  return (
    <div className="fixed bottom-0 bg-black w-full h-[80px] px-4 py-2">
            {/* add  key={song!._id}: to destroy this element, otherwise has conflict with others */}
           <PlayerContent
                key={player.activeId}
                song={song}
            />
    </div>
  )
}
