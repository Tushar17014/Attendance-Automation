import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allStudents: null,
  studentDetails: null,
}

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    getAllStudentsRedux: (state, action) => {
      state.allStudents = action.payload
    },
    getStudentDetailsRedux: (state, action) => {
      state.studentDetails = action.payload
    },
  },
})

export const { getAllStudentsRedux, getStudentDetailsRedux } = studentSlice.actions

export default studentSlice.reducer