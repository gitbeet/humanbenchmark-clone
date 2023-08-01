import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import { db } from "../../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import { emptyResults } from "../results/resultsSlice";

interface LoginUserDataInterface {
  email: string;
  password: string;
}

interface RegisterUserDataInterface {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface InitialStateInterface {
  user: User | null;
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// TODO : -separate message by field (email error , password error , ...)
const initialState: InitialStateInterface = {
  user: null,
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

interface Map {
  [key: string]: string;
}

const firebaseErrorMessages: Map = {
  "auth/wrong-password": "Wrong password",
  "auth/invalid-email": "Invalid email",
  "auth/user-not-found": "User not found",
  "auth/weak-password": "Password must be at least 6 characters long",
  "auth/email-already-in-use": "User with this email already exists",
  "auth/missing-password": "Missing password",
  "auth/missing-email": "Missing email",
};

export const login = createAsyncThunk(
  "user/login",
  async (userData: LoginUserDataInterface, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
      //   ANY !!!!!!!!
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    { email, password, confirmPassword, username }: RegisterUserDataInterface,
    thunkAPI
  ) => {
    if (password !== confirmPassword) {
      throw thunkAPI.rejectWithValue("Passwords do not match");
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser) return;
      await updateProfile(auth.currentUser, { displayName: username });
      if (auth.currentUser) {
        return await setDoc(
          doc(db, "users", auth.currentUser.uid),
          emptyResults
        );
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.code);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // =========== LOGIN ============
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      const errorMessage =
        firebaseErrorMessages[payload as string] || (payload as string);
      state.message = errorMessage;
    });
    // =========== REGISTER ============
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      const errorMessage =
        firebaseErrorMessages[payload as string] || (payload as string);
      state.message = errorMessage;
    });
    // =========== SIGNOUT ============
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      // not sure if needed
      state.message = payload as string;
    });
  },
});

export const { reset, setUser } = userSlice.actions;
export default userSlice.reducer;
