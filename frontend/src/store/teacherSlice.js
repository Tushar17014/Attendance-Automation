import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const teacherDetailsSlice = createSlice({
  name: 'teacherDetails',
  initialState,
  reducers: {
    getTeacherDetailsRedux: (state, action) => {
        state.data = action.payload
    }
  },
})

export const { getTeacherDetailsRedux } = teacherDetailsSlice.actions

export default teacherDetailsSlice.reducer