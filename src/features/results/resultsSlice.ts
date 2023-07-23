import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import { GameResultInterface } from "../../models";
import { db } from "../../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../../firebase/config";
import { RootState } from "../../utilities/store";
import { ResultData } from "../../models";
const JSONlocalstorageResults = localStorage.getItem("humanbenchmarkResults");
let localstorageResults = null;
if (JSONlocalstorageResults !== null) {
  localstorageResults = JSON.parse(JSONlocalstorageResults);
}

export const initialResults: GameResultInterface = localstorageResults
  ? localstorageResults
  : {
      typing: [],
      reactionTime: [],
      sequenceMemory: [],
      aimTrainer: [],
      numberMemory: [],
      verbalMemory: [],
      chimpTest: [],
      visualMemory: [],
    };

interface InitialStateInterface {
  results: GameResultInterface | null;
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
const initialState: InitialStateInterface = {
  results: initialResults,
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const updateResults = createAsyncThunk(
  "results/update",
  async ({ game, result }: ResultData, thunkAPI) => {
    try {
      if (!auth.currentUser) return;
      const userUid = auth.currentUser.uid;
      const { results } = thunkAPI.getState() as RootState;
      // deep copy ?
      const updatedResults = JSON.parse(JSON.stringify(results.results));
      updatedResults[game as keyof GameResultInterface].push(result);
      return await setDoc(doc(db, "users", userUid), updatedResults);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const results = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action) => {
      console.log("setting results");
      state.results = action.payload;
      console.log(state.results);
    },
    updateResultsLocalStorage: (
      state,
      { payload }: PayloadAction<{ game: string; result: number }>
    ) => {
      const { game, result } = payload;
      console.log("running updatelocalstorageresults");
      console.log(game, result);
      // const updatedResults = { ...state }.results;
      // updatedResults[game as keyof GameResultInterface].push(result);
      // state.results = updatedResults;
      if (state.results !== null)
        state.results[game as keyof GameResultInterface].push(result);
      console.log(current(state.results));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateResults.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateResults.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload as string;
      });
  },
});

export const { setResults, updateResultsLocalStorage } = results.actions;
export default results.reducer;
