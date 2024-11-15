import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allCourses: null,
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    getAllCoursesRedux: (state, action) => {
      state.allCourses = action.payload
    }
  },
})

export const { getAllCoursesRedux } = courseSlice.actions

export default courseSlice.reducer