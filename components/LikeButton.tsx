"use client"
import { useUser } from '@/hooks/useUser';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useAuthModal from '@/hooks/useAuthModal';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface LikedButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikedButtonProps> = ({
    songId
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { user } = useUser();
  const authModal = useAuthModal();
  const router = useRouter();

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      try {
        const response = await axios.delete(`/api/liked-song?songId=${songId}`);
        setIsLiked(false);
      } catch (error) {
         toast.error("Something went wrong.")
      }
    } else {
       try {
         const response = await axios.post(`/api/liked-song`, {
             user_id: user.email,
             song_id: songId,
         });
         setIsLiked(true);
         toast.success("Liked!")
       } catch (error) {
        toast.error("Something went wrong.")
      }
    }
    
    router.refresh();
 }

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/liked-song?userId=${user.email}&songId=${songId}`);
        if (response.data && response.data.liked === true) {
           setIsLiked(response.data.liked);
        }
       } catch (error) {
         toast.error("Something went wrong!")
       }
    }
    fetchData();
 }, [user, songId, setIsLiked])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
        <Icon
            size={26} 
            color={isLiked ? '#22c55e' : 'white'}
        /> 
    </button>
  )
}

export default LikeButton
