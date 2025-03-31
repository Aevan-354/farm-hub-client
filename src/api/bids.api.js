import { API } from ".";
import { getCurrentUser } from "./current-user"

export const getUserBids = async () => {
    const currentUserId =getCurrentUser().id;
    const {data} =await API.get(`/bids/user/${currentUserId}`);
    return data;
}

export const getLandBids = async landId => {
    const {data} =await API.get(`/bids/land/${landId}`);
    return data;
}

export const placeBid = async (payload) => {
    const currentUserId =getCurrentUser().id;
    return await API.post(`/bids`, {...payload, user_id: currentUserId});
}

export const removeBid = async (bidId) => {
    return await API.delete(`/bids/${bidId}`);
}

export const getAvailableLand = async () => {
    const {data} =await API.get(`/lands/available`);
    return data;
}


export const selectHighestBidder = async (bidId, bidder_id) => {
    const {data} =await API.post(`/bids/select-winner/${bidId}`, {bidder_id});
    return data;
}