"use client"
import React from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    children: React.ReactNode;
    onChange: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    description,
    children,
    onChange
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange} >
         <Dialog.Portal>
            <Dialog.Overlay
               className="bg-neutral-900 backdrop-blur-sm fixed inset-0"
            />
            <Dialog.Content className="
                                        fixed 
                                        top-[50%] 
                                        left-[50%] 
                                        h-full
                                        md:h-auto
                                        md:max-h-[85vh]
                                        w-full
                                        md:w-[90vw]
                                        md:max-w-[600px] 
                                        p-[25px]
                                        translate-x-[-50%]
                                        translate-y-[-50%]
                                        transition     
                                        border
                                        border-bg-neutral-700
                                        focus:outline-none
                                        rounded-md
                                        bg-black
                 ">
                <Dialog.Title className="text-3xl text-bold text-center mb-4">
                    {title}
                </Dialog.Title>
                <Dialog.Description className="text-sm text-center mb-4">
                    {description}
                </Dialog.Description>
                <div className="px-20"> {children} </div>
               <Dialog.Close 
                                className="
                                            fixed 
                                            top-[10px]
                                            right-[10px]
                                            focus:outline-none
                                            hover:text-white
                                            text-neutral-400
                                            w-[25px] 
                                            h-[25px]
                                            rounded-full 
                                       ">
                  <IoMdClose/>
               </Dialog.Close>
            </Dialog.Content>
         </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
