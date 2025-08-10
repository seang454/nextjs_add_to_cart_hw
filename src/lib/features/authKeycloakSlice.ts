import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    token: null as string | null
}

export const authKeycloakSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken(state, action:PayloadAction<string>){
            state.token = action.payload;
        }
    }
})

export const {setAccessToken} = authKeycloakSlice.actions;
export default authKeycloakSlice.reducer;