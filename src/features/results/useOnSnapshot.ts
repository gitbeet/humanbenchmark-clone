import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../firebase/config";
import { setResults, setGlobalResults } from "./resultsSlice";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { GlobalResults } from "../../models";

export const useOnSnapshot = () => {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    const getGlobalResults = async () => {
      const result: any[] | GlobalResults[] = [];
      const globalResultsRef = collection(db, "globalResults");
      const globalResultsSnapshot = await getDocs(globalResultsRef);
      globalResultsSnapshot.forEach((doc) =>
        result.push({ game: doc.id, result: doc.data() })
      );
      dispatch(setGlobalResults(result));
    };
    getGlobalResults();

    let hourlyInterval = setInterval(getGlobalResults, 300000);
    return () => {
      getGlobalResults();
      clearInterval(hourlyInterval);
    };
  }, []);
};
