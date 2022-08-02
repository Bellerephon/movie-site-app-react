import { useState, useEffect } from "react";
import { getCollectionDetails } from "../lib/init-firebase";
import { useUserAuth } from '../contexts/user-auth-context';

export const useCollectionDetails = (collect) => {
    const [userData, setUserData] = useState(null);
    const { user } = useUserAuth();

    useEffect(() => {
        getCollectionDetails(user.uid, collect)
            .then(res => setUserData(res));
    }, []);
  
    return userData;
  };
