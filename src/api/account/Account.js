import axios from "axios";

export const login = async (token, loginType) => {
    const response = await axios.post('accounts:login', {
        third_party_token: token,
        login_type: loginType,
    });
    return response.data;
};

export const getMyAccount = async () => {
    const token = sessionStorage.getItem("token")
    const response = await axios.get('account', {
        headers: {Authorization: token},
    });
    return response.data;
};
