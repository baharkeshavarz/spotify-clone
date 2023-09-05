import db from '@/lib/mongo/db';
import Song from '@/lib/mongo/models/Song';

const getSongs = async () => {
   await db.connect();
   const songs = await Song.find();
   
   return songs || [];
}

export default getSongs
