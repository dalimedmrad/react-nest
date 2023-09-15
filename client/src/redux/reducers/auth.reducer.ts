import { createSlice } from "@reduxjs/toolkit"

interface Istate {
    id: string,
    fullname: string,
    email: string,
    opt_enabled: boolean,
    opt_validated: boolean
}

const initialState: Istate = {
    id: "",
    fullname: "",
    email: "",
    opt_enabled: false,
    opt_validated: false


}

export const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase("auth/login/fulfilled", (state, action: any) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.fullname = action.payload.fullname;
            state.opt_enabled = action.payload.opt_enabled;
            state.opt_validated = action.payload.opt_validated;
        })
            .addCase("auth/verify-otp/fulfilled", (state, action: any) => {
                state.opt_enabled = action.payload.opt_enabled;
            })
            .addCase("auth/validate-otp/fulfilled", (state, action: any) => {
                state.opt_validated = action.payload.opt_validated;
            })
            .addCase("auth/disable-otp/fulfilled", (state, action: any) => {
                state.opt_enabled = action.payload.opt_enabled;
            });

    },
})
