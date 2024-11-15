import axiosInstance from "@/utils/axiosInstance";

export async function getAllStudents() {
    try{
        const response = await axiosInstance.get(`/getAllStudents`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function getStudentByEnroll(enroll) {
    try{
        const response = await axiosInstance.get(`/getStudentByEnroll?enroll=${enroll}`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function getStudentByCourse(courseID) {
    try{
        const response = await axiosInstance.get(`/getStudentByCourse?courseID=${courseID}`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function addStudentEncodings(data){
    try{
        const response = await axiosInstance.post(`/addStudentEncodings`, data, {
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

export async function addStudent(data){
    try{
        const response = await axiosInstance.post(`/addStudent`, data);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}