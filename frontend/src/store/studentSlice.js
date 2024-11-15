import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allStudents: null,
}

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    getAllStudentsRedux: (state, action) => {
      state.allStudents = action.payload
    }
  },
})

export const { getAllStudentsRedux } = studentSlice.actions

export default studentSlice.reducer