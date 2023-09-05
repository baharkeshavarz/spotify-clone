import { options } from '@/app/api/auth/[...nextauth]/options';
import db from '@/lib/mongo/db';
import Song from '@/lib/mongo/models/Song';
import User from '@/lib/mongo/models/User';
import { getServerSession } from 'next-auth';

export async function getSession() {
   return await getServerSession(options)
}

const getSongsByUserId = async () => {
   const session = await getSession();
   if (!session?.user?.email) {
     return null;
   }

   await db.connect();
   let songs = [];
   const user = await User.findOne({email: session.user.email});
   if (user) {
      songs = await Song.find({user_id: user._id});
   }
   
   return songs as any || [];
}

export default getSongsByUserId
