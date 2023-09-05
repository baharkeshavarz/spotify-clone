import db from '@/lib/mongo/db';
import { default as SongSchem } from '@/lib/mongo/models/Song';
import { Song } from '@/types';

const getSongs = async () => {
   await db.connect();
   let allSongs = await SongSchem.find();

   if (!allSongs) {
      return [];
   }

   let songs: Song[] = [];
   songs = allSongs!.map(song => {
      return {
          id: song._id,
          user_id: song.user_id,
          author: song.author,
          title: song.title,
          song_path: song.song_path,
          image_path: song.image_path,
       }
    })

   return songs;
}

export default getSongs
