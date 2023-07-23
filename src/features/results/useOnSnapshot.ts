import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../firebase/config";
import { setResults } from "./resultsSlice";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";

export const useOnSnapshot = () => {
  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.results);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!user) return;
    const userUid = user.uid;
    const resultsRef = doc(db, "users", userUid);
    onSnapshot(resultsRef, (snapshot) => {
      const results = snapshot.data();
      dispatch(setResults(results));
    });
  }, [user, dispatch]);
};
