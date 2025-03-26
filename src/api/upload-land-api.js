import { API } from "."

export const postLand = async formData =>{
    try {
        await  API.post('/lands', formData);
        return 'Land uploaded successfully'
        
    } catch (error) {
        return error.message
    }
}