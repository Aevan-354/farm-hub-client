import { API } from ".";

export const iniatePayment = async ({land_id, amount, phoneNumber}) => {
    const {data} =await API.post(`/payments/mpesa`, {land_id, amount, phone_number:formatPhoneNumber(phoneNumber)});
    return data;
}

function formatPhoneNumber(phoneNumber) {
    let numStr = String(phoneNumber).trim();
    if (numStr.startsWith('0'))  numStr = numStr.substring(1);
    if (!numStr.startsWith('254')) numStr = '254' + numStr;
    return numStr;
}
