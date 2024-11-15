import axiosInstance from "@/utils/axiosInstance";

export async function login(data) {
    try{
        const response = await axiosInstance.post(`/login`, data);
        return response.data;
    } catch(err){
        return {};
    }
}

export async function logout() {
    try{
        const response = await axiosInstance.post(`/logout`, {});
        return response.data;
    } catch(err){
        console.error(err.message);
        return {};
    }
}