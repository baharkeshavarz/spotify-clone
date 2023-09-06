"use client";

import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import useAuthModal from '@/hooks/useAuthModal';
import Input from './Input';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from "react-hot-toast";
import useRegisterModal from '@/hooks/useRegisterModal';
import Button from './Button';
import axios from 'axios';

const RegisterModal = () => {
  const loginModal = useAuthModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
      axios.post("/api/register", data)
        .then(() => {
          toast.success("You registerd Successfully!")
          registerModal.onClose();
          loginModal.onOpen();
        })
        .catch((error) => {
           toast.error("Something went wrong!")
        })
        .finally(() => {
           setIsLoading(false)
        })
   }

  const onToggle = useCallback(() => {
     loginModal.onOpen();
     registerModal.onClose();
  }, [loginModal, registerModal])


  const onChange = (open: boolean) => {
     if (!open) {
          registerModal.onClose();
     }
  }

  return (
    <Modal
         isOpen={registerModal.isOpen}
         title="Sign up in start listening"
         description="Create your account"
         onChange={onChange}
       >

       <Input
          id="name"
          placeholder="Full Name"
          disabled={isLoading}
          {...register('name', { })}
          required
      />

        <Input
          id="email"
          placeholder="Email or username"
          disabled={isLoading}
          {...register('email', { required: true })}
          required
      />
       {errors.email && <p role="alert" className="text-red-400">Insert the correct email.</p>}
      
       <Input
          id="password"
          placeholder="Password"
          type="password"
          disabled={isLoading}
          {...register('password', { required: true })}
          required
      />
       {errors.email && <p role="alert" className="text-red-400">Your password is not correct.</p>}
      <div className="h-[1px] bg-neutral-700 my-10 w-full"/>
      <Button
         className="w-full"
         onClick={handleSubmit(onSubmit)}
         >
        Sign up
      </Button>
      <hr className="mt-5 text-neutral-300"/>
      <div className="flex justify-center py-5 space-x-2">
          <span> Already have an account?</span><span onClick={onToggle} className="cursor-pointer">Log in here.</span>
      </div>
   </Modal>
  )
}

export default RegisterModal
