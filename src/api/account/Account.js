import {API_URL} from '../consts';

export const login = async (token, loginType) => {
    const response = await fetch(API_URL + 'accounts:login', {
        method: 'POST',
        body: JSON.stringify({
            third_party_token: token,
            login_type: loginType,
        }),
    });
    return response.json();
};

export const getMyAccount = async () => {
    const token = sessionStorage.getItem("token")
    const response = await fetch(API_URL + 'account', {
        method: 'GET',
        headers: {Authorization: token},
    });
    return response.json();
};
