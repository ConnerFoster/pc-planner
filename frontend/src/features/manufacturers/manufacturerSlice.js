import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import manufacturerService from './manufacturerService'

const initialState = {
  manufacturers: [],
  isError: false,
  isSuccess: false,
  message: '',
  manufacturer: {},
}

export const manufacturerSlice = createSlice({
  name: 'manufacturer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getManufacturers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getManufacturers.fulfilled, (state, action) => {
        state.isSuccess = true
        state.manufacturers = action.payload
        state.isLoading = false
      })
      .addCase(getManufacturers.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getManufacturerByID.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getManufacturerByID.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getManufacturerByID.fulfilled, (state, action) => {
        state.isSuccess = true
        state.manufacturer = action.payload
        state.isLoading = false
      })
  },
})

//get categories
export const getManufacturers = createAsyncThunk(
  'manufacturers/getAll',
  async (_, thunkAPI) => {
    try {
      return await manufacturerService.getManufacturers()
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

export const getManufacturerByID = createAsyncThunk(
  'manufacturers/getByID',
  async (id, thunkAPI) => {
    try {
      return await manufacturerService.getManufacturerByID(id)
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

export const createManufacturer = createAsyncThunk(
  'manufacturers/create',
  async (data, thunkAPI) => {
    try {
      return await manufacturerService.createManufacturer(data)
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

export const {reset} = manufacturerSlice.actions
export default manufacturerSlice.reducer
