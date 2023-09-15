import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginValues, RegisterValues } from "../../lib/validation";
import axios from "axios";

export const RegisterAction = createAsyncThunk("auth/register", async ({ data }: { data: RegisterValues }, { rejectWithValue }) => {
    try {
        const result = await axios.post('http://localhost:4000/api/register', data)
        return result.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const LoginAction = createAsyncThunk("auth/login", async ({ data }: { data: LoginValues }, { rejectWithValue }) => {
    try {
        const result = await axios.post('http://localhost:4000/api/login', data)
        return result.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})
export const LogoutAction = createAsyncThunk("auth/logout", async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
        const result = await axios.post('http://localhost:4000/api/logout', { id: id })
        return result.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const GenOTPAction = createAsyncThunk("auth/gen-otp", async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
        const result = await axios.post('http://localhost:4000/api/gen-otp', { id: id })
        return result.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const VerifyOTPAction = createAsyncThunk(
    "auth/verify-otp",
    async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
        try {
            const result = await axios.post("http://localhost:4000/api/verify-otp", {
                id: id,
                token: token,
            });
            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const ValidateOTPAction = createAsyncThunk(
    "auth/validate-otp",
    async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
        try {
            const result = await axios.post("http://localhost:4000/api/validate-otp", {
                id: id,
                token: token,
            });
            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const DisableOTPAction = createAsyncThunk(
    "auth/disable-otp",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const result = await axios.post("http://localhost:4000/api/disable-otp", {
                id: id,
            });
            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);    