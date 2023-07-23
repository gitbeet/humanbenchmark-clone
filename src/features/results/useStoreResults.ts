import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { setResults } from "./resultsSlice";
export const useStoreResults = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { results } = useAppSelector((state) => state.results);
  useEffect(() => {
    if (user) return;
    console.log("in get item useeffect");
    const localstorageResults = localStorage.getItem("humanbenchmarkResults");
    if (localstorageResults == null) return;
    console.log("after return");
    dispatch(setResults(JSON.parse(localstorageResults)));
  }, [dispatch, user]);

  useEffect(() => {
    if (user) return;
    localStorage.setItem("humanbenchmarkResults", JSON.stringify(results));
  }, [results, user]);
};
