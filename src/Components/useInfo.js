import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useInfo = () => {
  const [user, loading, error] = useAuthState(auth);

  const [userData, setUserData] = useState();
  useEffect(() => {
    if (user) {
      fetch(`https://authintic-server.onrender.com/viewUser/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.user);
        });
    }
  }, [user]);
  return [userData];
};

export default useInfo;
