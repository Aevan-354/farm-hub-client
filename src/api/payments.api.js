import { API } from ".";
import { getCurrentUser } from "./current-user"

export const iniatePayment = async () => {
    const currentUserId =getCurrentUser().id;
    const {data} =await API.get(`/bids/user/${currentUserId}`);
    return data;
}
