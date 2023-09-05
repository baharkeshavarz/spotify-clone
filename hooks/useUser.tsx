
import { Subscription, User } from "@/types";
import { useSession } from 'next-auth/react'
import { createContext, useContext, useState } from "react";

type UserContextType = {
    user: any,  //check
    userDetial: User | null;
    isLoading: boolean;
    subscription: Subscription | null;
    setUserDetail: (data: any) => void;
}

interface Props {
    [propName: string] : any
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const MyUserContextProvider = (props: Props) => {
    const { data: session } = useSession()
    const user = session && session.user || null;
    //let userDetial = null;
    const [userDetial, setUserDetail] = useState(null);
    const isLoading = false;
    const subscription = null;

    const value = {
        user,
        userDetial,
        isLoading,
        subscription,
        setUserDetail,
    }
    return <UserContext.Provider value={value} {...props} />;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }

  return context;
}