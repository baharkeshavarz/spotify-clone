"use client";
import AuthModal from '@/components/AuthModal';
import RegisterModal from '@/components/RegisterModal';
import UploadModel from '@/components/UploadModel';
import React, { useEffect, useState } from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
     <>
       <AuthModal/>
       <RegisterModal/>
       <UploadModel/>
     </>
  )
}

export default ModalProvider
