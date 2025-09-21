import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        id: action.payload.id,
        fullName: action.payload.fullName,
        email: action.payload.email,
        // phone: action.payload.phone,
        // address: action.payload.address
      };
    },
    removeUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
