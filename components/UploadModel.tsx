'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import useUploadModel from '@/hooks/useUploadModal';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import { toast } from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types';
import axios from 'axios';

const UploadModel = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const uploadModal = useUploadModel();

  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
      reset();
    }
  }

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset,
  } = useForm<FieldValues>({
     defaultValues: {
       author: '',
       title: '',
       song: null,
       image: null,
     }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log("errors", errors)
     try {
       setIsLoading(true)
       const imageFile = values.image?.[0];
       const songFile = values.song?.[0];

       if (!user || !imageFile || !songFile) {
         toast.error("Missing fields.")
         return;
       }

       // Upload file and image
       // Note that you do not need to set the header Content-Type to be multipart/form-data. This is done automatically when sending FormData.
       // Create new formData object
       const data = new FormData()
       data.set('songFile', songFile)
       data.set('imageFile', imageFile);
       data.set('title', values.title);
       const response = await fetch('/api/upload', {
          method: 'POST',
          body: data
        });
   
       const songInfo = await response.json();
       // handle the error
        if (!response.ok)  {
          setIsLoading(false)
          return toast.error('Failed image upload');
        }

      // Insert the song
       const songData: Song = {
          id: "",
          user_id: user.email,
          author: values.author,
          title: values.title,
          song_path: songInfo.songFile,
          image_path: songInfo.imageFile,
      }
      try {
        await axios.post('/api/song', songData);
        router.refresh();
        setIsLoading(false);
        toast.success('Song created!');
        reset();
        uploadModal.onClose();
       } catch (error) {
           setIsLoading(false)
           return toast.error('Failed adding a song');
       }
     } catch (error) {
           toast.error("Something went wrong!");
           setIsLoading(false)
     } finally {
          setIsLoading(false)
     }
  }

 

  return (
    <Modal
         isOpen={uploadModal.isOpen}
         title="Add a song"
         description="Upload an mp3 file"
         onChange={onChange}
       >
      <form onSubmit={handleSubmit(onSubmit)}>
          {errors && <p role="alert" className="text-red-400 py-2">Insert the data in correct format.</p>}
          <Input
            id="title"
            disabled={isLoading}
            placeholder="Song title"
            {...register('title', { required: true })}
          />
          <Input
            id="author"
            disabled={isLoading}
            placeholder="Song author"
            {...register('author', { required: true })}
          />
          <div>
            <div className="my-3">
              Select a song file
            </div>
            <Input
                id="song"
                type="file"
                disabled={isLoading}
                {...register('song', { required: true })}
                accept=".mp3"
          />
          </div>

          <div>
            <div className="my-3">
              Select a song image
            </div>
            <Input
                id="image"
                type="file"
                disabled={isLoading}
                {...register('image', { required: true })}
                accept="image/*"
          />
          </div>
          <Button 
                className="w-full" 
                disabled={isLoading}
                type="submit"
          >
            Create
          </Button>
       </form>
   </Modal>
  )
}

export default UploadModel
