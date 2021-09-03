import http from "../http-common";

/**
 * Facade for user data access which allows us to provide mock data for development
 * and provides easy access to axios when testing
 */
class UserDataService {
    getUser() {
        return devMode ? userDetails : http.get("/user");
    }
    logout() {
        return devMode ? logout : http.post("/logout");
    }
}

// check to see if we are in development mode
let devMode = false
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    devMode = true
}

// stub for GET in dev mode
const userDetails = new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            data: {
                avatar: null,
                name: "Demo user",
                alt: "Test Co. Ltd"
            }
        });
    }, 1000);
});

// stub for POST in dev mode
const logout = new Promise((resolve) => {
    setTimeout(() => {
        resolve(null);
    }, 2500);
})

export default new UserDataService();