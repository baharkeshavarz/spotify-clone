import getLikedSongs from '@/actions/getLikedSongs'
import Header from '@/components/Header';
import LikedContent from '@/components/LikedContent';
import Image from 'next/image';
import React from 'react'

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();
  return (
    <div className="w-full h-full bg-neutral-900 overflow-hidden overflow-y-auto rounded-lg">
        <Header>
            <div className="w-full flex items-center sm:flex-row flex-col py-5">
                <div className="w-32 h-32 lg:w-44 lg:h-42 relative">
                    <Image
                      src="/images/liked.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                </div>

                <div className="p-5">
                    <p className="hidden lg:block font-semibold">Playlist</p>
                    <h1 className="font-bold text-2xl lg:text-4xl">Liked Songs</h1>
                </div>
            </div>
        </Header>
        <LikedContent songs={songs}/>
    </div>
  )
}

export default Liked