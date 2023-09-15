import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth.reducer";

export default combineReducers({
    auth: AuthSlice.reducer,
})