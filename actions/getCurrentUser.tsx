import db from '@/lib/mongo/db';
import User from '@/lib/mongo/models/User';

const getCurrentUser = async (email: string) => {
   try {
      await db.connect();
      const user = await User.findOne({email: email});

      return user || null;

   } catch (error) {
       return null;
   }
}

export default getCurrentUser
