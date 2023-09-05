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
import { useUser } from '@/hooks/useUser';
import { error } from 'console';

const AuthModel = () => {
  const loginModal = useAuthModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const { setUserDetail } = useUser();
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
    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then(async (callback) => {
      setIsLoading(false);

      if (!callback?.error) {
        toast.success("Logged in");
        setUserDetail({id: "test"});
        router.refresh();
        loginModal.onClose();
      } else {
        toast.error(callback.error);
      }
    });
  }

  const onToggle = useCallback(() => {
     loginModal.onClose();
     registerModal.onOpen();
  }, [loginModal, registerModal])


  const onChange = (open: boolean) => {
     if (!open) {
       loginModal.onClose();
     }
  }

  return (
    <Modal
         isOpen={loginModal.isOpen}
         title="Log in to Spotify"
         description="Login to your account"
         onChange={onChange}
       >
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
        Log In
      </Button>
   </Modal>
  )
}

export default AuthModel
