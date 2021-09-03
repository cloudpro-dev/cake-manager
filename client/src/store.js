import React, {createContext, useContext, useState, useReducer} from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import UserDataService from "./services/user.service";
import PropTypes from "prop-types"

const AuthContext = createContext(null);
const CakesContext = createContext([]);

/**
 * Provides a context for all security related operations
 */
export function AuthProvider({ children, authPending=false, authenticated=false }) {
    const [isAuthenticated, setAuthenticated] = useState(authenticated);
    const [userDetails, setUserDetails] = useState(null);
    const [isAuthPending, setAuthPending] = useState(authPending);
    const history = useHistory();

    // verify if session is authenticated
    const getUserDetails = () => {
        UserDataService.getUser()
            .then(resp => {
                setAuthenticated(true);
                setUserDetails(resp.data);
            })
            .catch(() => {
                // cannot validate the user
                console.log("User is not logged in");
            })
            // mark authentication check as complete
            .finally(() => setAuthPending(false));
    }

    // logout of the application
    const logout = () => {
        UserDataService.logout().then(() => {
            Cookies.remove('XSRF-TOKEN');

            setAuthenticated(false);
            setUserDetails(null);

            // redirect to home page
            history.push('/');
        });
    }

    const authValue = [
        {
            isAuthenticated,
            userDetails,
            isAuthPending
        },
        {
            getUserDetails,
            logout
        }
    ];

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
    authPending: PropTypes.bool,
    authenticated: PropTypes.bool
}

/**
 * Reducer for Cake state logic
 * @param state application state
 * @param action the action to perform
 * @returns {*[]}
 */
export const reducer = (state = [], action = {}) => {
    const mutatedItem = action.payload;
    if (!mutatedItem) {
        return;
    }
    const mutatedIndex = state.findIndex((item) => item.id === mutatedItem.id);
    switch (action.type) {
        case "LOADED":
            return [...mutatedItem];
        case "CREATED":
            if (mutatedIndex < 0) {
                state.push(mutatedItem);
            }
            break;
        default:
    }
    return [...state];
};

/**
 * Provides a context for Cake related operations
 */
export function CakesProvider({ children, initialState }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CakesContext.Provider value={{state, dispatch}}>
            {children}
        </CakesContext.Provider>
    );
}

CakesProvider.propTypes = {
    children: PropTypes.node,
    initialState: PropTypes.array
}

export const useAuthStore = () => useContext(AuthContext);
export const useCakesStore = () => useContext(CakesContext);