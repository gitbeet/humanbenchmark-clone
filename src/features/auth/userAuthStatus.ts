import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { setUser } from "../auth/userSlice";
import { useAppDispatch } from "../../utilities/hooks";
export const useUserStatus = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("running useuserstatus");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
};
