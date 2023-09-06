import { options } from '@/app/api/auth/[...nextauth]/options';
import db from '@/lib/mongo/db';
import LikedSong from '@/lib/mongo/models/LikedSong';
import { getServerSession } from 'next-auth';
import getCurrentUser from './getCurrentUser';
import { Song } from '@/types';

export async function getSession() {
   return await getServerSession(options)
}

const getLikedSongs = async () => {
    const session = await getSession();

   await db.connect();
   const user = await getCurrentUser(session?.user?.email as string);
   const likedSongs = await LikedSong.find({user_id: user?._id}).populate('song_id');

  if (!likedSongs) {
     return [];
  }

  let songs: Song[] = [];
  songs = likedSongs.map(song => {
   console.log("song", song)
   console.log("song_id author",song.song_id[0].author)
   console.log({
      id: song.song_id[0]._id,
      user_id: user?._id,
      author: song.song_id[0].author,
      title: song.song_id[0].title,
      song_path: song.song_id[0].song_path,
      image_path: song.song_id[0].image_path,
      }
  );

     return {
      id: song.song_id[0]._id,
      user_id: user?._id,
      author: song.song_id[0].author,
      title: song.song_id[0].title,
      song_path: song.song_id[0].song_path,
      image_path: song.song_id[0].image_path,
      }
   })

  return songs;
}

export default getLikedSongs
