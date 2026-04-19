import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    setHealthData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setHealthData } = healthSlice.actions;
export default healthSlice.reducer;