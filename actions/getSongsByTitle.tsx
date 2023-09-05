import db from '@/lib/mongo/db';
import Song from '@/lib/mongo/models/Song';
import getSongs from './getSongs';

const getSongsByTitle = async (songTitle: string) => {
   await db.connect();
   let songs = [];

   if (!songTitle) {
      songs = await getSongs();
   } else {
      songs = await Song.find({ title: {$regex: `.*${songTitle}.*`}});  // Like in mongodb
   }

   return songs as any || [];
}

export default getSongsByTitle
