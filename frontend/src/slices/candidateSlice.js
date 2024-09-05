import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCandidate = createAsyncThunk(
    'candidate/create',
    async (candidateData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/candidate', candidateData)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error creating candidate');
        }
    }
)

export const updateCandidate = createAsyncThunk(
    'candidate/update',
    async (candidateData, { rejectWithValue }) => {
        const { id } = candidateData;
        try {
            const response = await axios.put(`http://localhost:5000/api/candidate/${id}`, candidateData)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error updating candidate')
        }
    }
)

export const getCandidates = createAsyncThunk(
    'candidate/get',
    async (searchCriteria, { rejectWithValue }) => {
        try {
            console.log("inside get Candidates");
            const { skills, experience, location } = searchCriteria;
            const response = await axios.get('http://localhost:5000/api/candidate', {
                params: { skills, experience, location }
            })
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching candidates');
        }
    }
)

export const deleteCandidate = createAsyncThunk(
    'candidate/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/candidate/${id}`);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error deleting candidate')
        }
    }
)

const candidateSlice = createSlice({
    name: "candidate",
    initialState: {
        candidates: [],
        loading: false,
        message: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCandidate.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message
                state.candidates.push(action.payload.candidate);
            })
            .addCase(createCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })


            .addCase(updateCandidate.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message
                const index = state.candidates.findIndex(cand => cand.id === action.payload.candidate.id);
                if (index !== -1) {
                    state.candidates[index] = action.payload.candidate;
                }

            })
            .addCase(updateCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })


            .addCase(getCandidates.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCandidates.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = action.payload.candidates
                state.message = action.payload.message
            })
            .addCase(getCandidates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })


            .addCase(deleteCandidate.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message
                console.log(action.payload);
                state.candidates = state.candidates.filter(cand => cand.id !== action.meta.arg);

            })
            .addCase(deleteCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

    }
})

export default candidateSlice.reducer;