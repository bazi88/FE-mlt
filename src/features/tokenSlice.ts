import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface TokenState {
    access_token: string | null;
}

const initialState : TokenState = {
    access_token: null
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        logIn: (
            state,
            action: PayloadAction<{access_token : string}> 
            ) => {
                localStorage.setItem("token", 
                JSON.stringify({
                    access_token: action.payload.access_token
                }),
            );
            state.access_token = action.payload.access_token;
        },

        logOut: (
            state,
        ) => {
            localStorage.clearItem("token");
            state.access_token = null;
        }
    }
})

export const selectToken = (state: RootState) => state.token;

export const { logIn, logOut } = tokenSlice.actions;

export default tokenSlice.reducer;