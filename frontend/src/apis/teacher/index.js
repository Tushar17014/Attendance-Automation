import axiosInstance from "@/utils/axiosInstance";

export async function getAllTeachers() {
    try{
        const response = await axiosInstance.get('/getAllTeachers');
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
    
}

export async function getTeacherDetails(uid) {
    try{
        const response = await axiosInstance.get('/getTeacherByUid', {
            params: {uid: uid}
        });
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
    
}
