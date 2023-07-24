import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import resultsReducer from "../features/results//resultsSlice";
import modalsReducer from "../features/modals/modalsSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    results: resultsReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
