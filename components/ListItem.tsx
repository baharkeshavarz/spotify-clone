"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import PlayButton from './PlayButton';

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({
    image,
    name,
    href
}) => {
  const router = useRouter();  
  const onClick = () => {
     router.push(href);
  }
   
  return (
    <button 
       onClick={onClick}
       className="relative group rounded-md flex items-center gap-2 shadow-sm bg-neutral-100/10">
        <div className="relative min-h-[64px] min-w-[64px]">
            <Image
                alt="image"
                src={image}
                fill
                className="object-cover"
            />
        </div>
        <p className="font-medium text-white truncate">
            {name}
        </p>

        <div className="flex items-center absolute top-2 right-5">
           <PlayButton/>
        </div>
    </button>
  )
}

export default ListItem
