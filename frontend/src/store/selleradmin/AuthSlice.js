import { createSlice } from "@reduxjs/toolkit";

export const saAuthSlice = createSlice({
    name: "saAuth",
    initialState: {
        saAuth: null,
    },
    reducers: {
        setSaAuth: (state, action) => {
            state.saAuth = action.payload
        }
    }
})

export const { setSaAuth } = saAuthSlice.actions
export default saAuthSlice.reducer