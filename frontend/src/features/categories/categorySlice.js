import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import categoryService from './categoryService'

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  category: {},
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isSuccess = true
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getCategoryByID.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategoryByID.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getCategoryByID.fulfilled, (state, action) => {
        state.isSuccess = true
        state.category = action.payload
        state.isLoading = false
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isSuccess = true
        state.categories.push(action.payload)
        state.isLoading = false
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.categories = state.categories.filter(
          (c) => c._id !== action.payload.id
        )
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isSuccess = true
        const update = state.categories.find(
          (c) => c._id === action.payload._id
        )
        if (update) {
          update.title = action.payload.title
          update.description = action.payload.description
        }
        console.log(action.payload)
        state.isLoading = false
      })
  },
})

export const createCategory = createAsyncThunk(
  'categories/create',
  async (data, thunkAPI) => {
    try {
      return await categoryService.createCategory(data)
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

export const updateCategory = createAsyncThunk(
  'categories/update',
  async (data, thunkAPI) => {
    try {
      console.log(data)
      return await categoryService.updateCategory(data)
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

//get categories
export const getCategories = createAsyncThunk(
  'categories/getAll',
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories()
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

//get a category by id
export const getCategoryByID = createAsyncThunk(
  'categories/getByID',
  async (id, thunkAPI) => {
    try {
      return await categoryService.getCategoryByID(id)
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

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(id)
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
export const {reset} = categorySlice.actions
export default categorySlice.reducer
