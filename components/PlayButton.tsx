import React from 'react'
import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  return (
     <button className="flex
                        justify-center 
                        relative
                        opacity-0 
                        transition
                        translate
                        translate-y-1/4
                        hover:scale-110
                        group-hover:opacity-100 
                        group-hover:translate-y-0
                        rounded-full
                        bg-spotify-green 
                        drop-shadow-md
                        p-4">
       <FaPlay className="text-black" />
    </button>
  )
}

export default PlayButton
