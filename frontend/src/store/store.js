import { configureStore } from '@reduxjs/toolkit'
import teacherDetailsReducer from './teacherSlice'
import allStudentsReducer from './studentSlice'
import allCoursesReducer from './courseSlice'

export const store = configureStore({
  reducer: {
    teacherDetails: teacherDetailsReducer,
    students: allStudentsReducer,
    course: allCoursesReducer,
  },
})