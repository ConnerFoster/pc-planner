import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import partService from './partService'

const initialState = {
  parts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  part: {},
}

export const partSlice = createSlice({
  name: 'part',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getParts.fulfilled, (state, action) => {
        state.isSuccess = true
        state.parts = action.payload
        state.isLoading = false
      })
      .addCase(getParts.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getPartByID.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getPartByID.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getPartByID.fulfilled, (state, action) => {
        state.isSuccess = true
        state.part = action.payload
        state.isLoading = false
      })
      .addCase(deletePart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePart.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.parts = state.parts.filter(
          (part) => part._id !== action.payload.id
        )
      })
      .addCase(deletePart.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
  },
})

//get parts
export const getParts = createAsyncThunk(
  'parts/getAll',
  async (_, thunkAPI) => {
    try {
      return await partService.getParts()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get a part by id
export const getPartByID = createAsyncThunk(
  'parts/getByID',
  async (id, thunkAPI) => {
    try {
      return await partService.getPartByID(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createPart = createAsyncThunk(
  'parts/create',
  async (data, thunkAPI) => {
    try {
      return await partService.createPart(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deletePart = createAsyncThunk(
  'parts/delete',
  async (id, thunkAPI) => {
    try {
      return await partService.deletePart(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const {reset} = partSlice.actions
export default partSlice.reducer
