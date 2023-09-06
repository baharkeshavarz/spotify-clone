import { options } from '@/app/api/auth/[...nextauth]/options';
import db from '@/lib/mongo/db';
import { default as SongSchem } from '@/lib/mongo/models/Song';
import User from '@/lib/mongo/models/User';
import { Song } from '@/types';
import { getServerSession } from 'next-auth';

export async function getSession() {
   return await getServerSession(options)
}

const getSongsByUserId = async () => {
   const session = await getSession();
   if (!session?.user?.email) {
     return [];
   }

   await db.connect();
   let songs = [];
   const user = await User.findOne({email: session.user.email});
   if (user) {
      songs = await SongSchem.find({user_id: user._id});
   }
   
   if (!songs) {
      return [];
   }

   const songList: Song[] = songs!.map(song => {
      return {
          id: song._id,
          user_id: song.user_id,
          author: song.author,
          title: song.title,
          song_path: song.song_path,
          image_path: song.image_path,
       }
    })

   return songList;
}

export default getSongsByUserId
