import { configureStore } from '@reduxjs/toolkit'
import teacherDetailsReducer from './teacherSlice'
import allStudentsReducer from './studentSlice'

export const store = configureStore({
  reducer: {
    teacherDetails: teacherDetailsReducer,
    students: allStudentsReducer,
  },
})