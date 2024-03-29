import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import { GameResultInterface, GlobalResults } from "../../models";
import { db } from "../../../firebase/config";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { auth } from "../../../firebase/config";
import { RootState } from "../../utilities/store";
import { ResultData } from "../../models";
import initialGlobalResults from "../../utilities/initialGlobalResults";

export const emptyResults = {
  typing: [],
  reactiontime: [],
  sequencememory: [],
  aimtrainer: [],
  numbermemory: [],
  verbalmemory: [],
  chimptest: [],
  visualmemory: [],
};

const user = auth.currentUser;

const JSONlocalstorageResults = localStorage.getItem("humanbenchmarkResults");

let localstorageResults = null;

if (JSONlocalstorageResults) {
  localstorageResults = JSON.parse(JSONlocalstorageResults);
}

export const initialResults: GameResultInterface =
  !user && localstorageResults
    ? localstorageResults
    : {
        typing: [],
        reactiontime: [],
        sequencememory: [],
        aimtrainer: [],
        numbermemory: [],
        verbalmemory: [],
        chimptest: [],
        visualmemory: [],
      };

interface InitialStateInterface {
  results: GameResultInterface | null;
  globalResults: GlobalResults[];
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
const initialState: InitialStateInterface = {
  results: initialResults,
  globalResults: initialGlobalResults,
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateGlobalResults = createAsyncThunk(
  "results/updateGlobal",
  async ({ game, result }: ResultData, thunkAPI) => {
    try {
      if (!auth.currentUser) return;
      const docRef = doc(db, "globalResults", game);
      // increment -> no conflict ?
      updateDoc(docRef, { [result]: increment(1) });
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const results = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setGlobalResults: (state, action) => {
      state.globalResults = action.payload;
    },
    updateResultsLocalStorage: (
      state,
      { payload }: PayloadAction<{ game: string; result: number }>
    ) => {
      const { game, result } = payload;
      if (state.results !== null)
        state.results[game as keyof GameResultInterface].push(result);
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
      })
      .addCase(updateGlobalResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGlobalResults.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateGlobalResults.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload as string;
      });
  },
});

export const { setResults, updateResultsLocalStorage, setGlobalResults } =
  results.actions;
export default results.reducer;
