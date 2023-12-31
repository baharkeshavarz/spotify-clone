"use client"
import React, { useMemo } from 'react'
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi";
import Box from './Box';
import SidBarItem from './SidBarItem';
import Library from './Library';
import { Song } from '@/types';

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[],
}
const Sidebar: React.FC<SidebarProps> = ({
        children,
        songs
      }) => {
  const pathname = usePathname();  
  const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Home",
            active: pathname !== "search",
            href: "/",
        },
        {
            icon: BiSearch,
            label: "Search",
            href: "/search",
            active: pathname === "/search"
        }
    ], [pathname]);

  return (
    <div className="flex h-full">
       <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
          <Box className="flex flex-col gap-y-4 px-5 py-4">
              { routes.map( item => 
                  <SidBarItem 
                        key={ item.label }
                        {...item}
                  />
              )}
          </Box>
         <Box className="overflow-y-auto h-full">
             <Library songs={songs} />
         </Box>
       </div>

       <main className="flex-1 h-full overflow-y-auto py-2">
         { children }
       </main>
    </div>
  )
}

export default Sidebar
