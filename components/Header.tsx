"use client";

import React from 'react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface HeaderProps {
    children: React.ReactNode,
    className?: string,
}
const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {

  const router = useRouter();
  let { user } = useUser();
  const authModel = useAuthModal();
  
  const handleLogout = async () => {
    await signOut();
    toast.success("Logged Out!")
    router.refresh()
  }

  return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6 w-full`, className)}>
           <div className="flex justify-between items-center w-full">
               <div className="hidden md:flex justify-between gap-x-3 ">
                  <button
                      className="bg-black flex justify-center items-center hover:opacity-75 rounded-full cursor-pointer p-1"
                      onClick={() => router.back()}
                    >
                     <RxCaretLeft className="text-white" size={35} />
                  </button>

                  <button
                     className="bg-black flex justify-center items-center hover:opacity-75 rounded-full cursor-pointer p-1"
                     onClick={() => router.forward()}
                  >
                     <RxCaretRight className="text-white" size={35} />
                  </button>
               </div>
             
               <div className="flex md:hidden justify-between items-center gap-x-2">
                         <button 
                                 onClick={() => router.push("/")}
                                 className="flex items-center hover:opacity-75 rounded-full cursor-pointer bg-white p-3"
                                >
                                 <HiHome className="text-black" size={20} />
                          </button>

                          <button 
                                 onClick={() => router.push("/")}
                                 className="flex items-center hover:opacity-75 rounded-full cursor-pointer bg-white p-3"
                                >
                                 <BiSearch className="text-black" size={20} />
                          </button>
               </div>

              <div className="flex justify-between">
                    { user ? (
                      <div className="flex items-center justify-center gap-x-4">
                         <Button
                              onClick={handleLogout}
                              className="bg-white px-6 py-2"
                              >
                            Log out 
                          </Button>
                          <Button 
                              onClick={() => router.push("/account")}
                              className="bg-white"
                            >
                            <FaUserAlt size={20} />
                          </Button>
                      </div>
                    )
                    :
                    (
                      <div className="flex items-center">
                        <div>
                           <Button className="bg-transparent text-neutral-300">
                             Sign up
                           </Button>   
                        </div>
                        <div>
                        <Button className="bg-white px-6 py-2" onClick={authModel.onOpen}>
                          Log in
                        </Button>
                        </div>
                      </div>
                    )
                 }
              </div>
           </div>
           {children}
        </div>
  )
}

export default Header
