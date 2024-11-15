import axiosInstance from "@/utils/axiosInstance";

export async function getAllCourses() {
    try{
        const response = await axiosInstance.get(`/getAllCourses`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}
export async function getCourseDetails(courseID) {
    try{
        const response = await axiosInstance.get(`/getCourseByID?cid=${courseID}`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function getCourseDetailsArray(courseIDs) {
    try{
        const response = await axiosInstance.get(`/getCourseByArrayID?cids=${courseIDs}`);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

export async function addCourse(data){
    try{
        const response = await axiosInstance.post(`/addCourse`, data);
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}

