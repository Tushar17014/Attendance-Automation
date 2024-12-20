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
export async function getAttendanceByCourseEnroll(courseID, enroll) {
    try{
        const response = await axiosInstance.get(`/getAttendanceByCourseEnroll?cid=${courseID}&enroll=${enroll}`);
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

export async function takeAttendance(data){
    try{
        const response = await axiosInstance.post(`/takeAttendance`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function markAttendance(data, cid){
    try{
        const response = await axiosInstance.post(`/markAttendance`, {attendanceData: data, cid: cid});
        return response;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function editAttendance(data, cid, date){
    try{
        const response = await axiosInstance.post(`/editAttendance`, {attendanceData: data, cid: cid, date: date});
        return response;
    } catch(err){
        console.error(err.message);
        return {};
    }
}