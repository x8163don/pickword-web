import React, {useEffect, useState} from 'react';
import {getMyAccount, login} from '../api/account/Account';

export const AuthContext = React.createContext({
    isLoggingIn: false,
    token: '',
    thirdPartyToken: '',
    accountInfo: {},
    updateAccountInfo: () => {
    },
    onLogin: () => {
    },
    onLogout: () => {
    },
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [thirdPartyToken, setThirdPartyToken] = useState('');
    const [accountInfo, setAccountInfo] = useState({});

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            setToken(token);
        }

        const thirdPartyToken = sessionStorage.getItem("thirdPartyToken");
        if (thirdPartyToken) {
            setThirdPartyToken(thirdPartyToken);
        }
    });

    const loginHandler = (thirtyPartyToken, loginType) => {
        setThirdPartyToken(thirtyPartyToken);
        sessionStorage.setItem("thirdPartyToken", thirtyPartyToken);
        login(thirtyPartyToken, loginType).then((res) => {
            if (res.token) {
                setIsLoggedIn(true);
                setToken(res.token);
                sessionStorage.setItem("token", res.token);
            }
            updateAccountInfoHandler()
        });
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
        setToken(null);
        setAccountInfo({});
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("thirdPartyToken");
    };

    const updateAccountInfoHandler = () => {
        getMyAccount().then((res) => {
            setAccountInfo(res);
        });
    };

    return <AuthContext.Provider value={{
        isLoggingIn: isLoggedIn,
        token: token,
        accountInfo: accountInfo,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        updateAccountInfo: updateAccountInfoHandler,
    }}>{props.children}</AuthContext.Provider>;
};


