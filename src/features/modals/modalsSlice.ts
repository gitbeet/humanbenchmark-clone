import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMobileMenu: false,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setShowMobileMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.showMobileMenu = payload;
    },
    toggleMobileMenu: (state) => {
      state.showMobileMenu = !state.showMobileMenu;
    },
  },
});

export default modalSlice.reducer;
export const { setShowMobileMenu, toggleMobileMenu } = modalSlice.actions;
