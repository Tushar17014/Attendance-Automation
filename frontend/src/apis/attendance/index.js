import axiosInstance from "@/utils/axiosInstance";

export async function getAttendanceByCourseDate(courseID, date) {
    try{
        const response = await axiosInstance.get(`/getAttendanceByCourseDate?cid=${courseID}&date=${date}`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function getAttendanceByEnroll(enroll) {
    try{
        const response = await axiosInstance.get(`/getAttendanceByEnroll?enroll=${enroll}}`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function getAttendanceByCourse(cid) {
    try{
        const response = await axiosInstance.get(`/getAttendanceByCourse?cid=${cid}`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}