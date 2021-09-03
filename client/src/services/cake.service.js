import http from "../http-common";
import {CAKE_FIXTURES} from "../data-common";

/**
 * Facade for user data access which allows us to provide mock data for development
 * and provides easy access to axios when testing
 */
class CakeDataService {
    getAll() {
        return devMode ? cakeList : http.get("/cakes");
    }
    create(data) {
        return devMode ? cakeData(data) : http.post("/cakes", data);
    }
}

// check to see if we are in development mode
let devMode = false
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    devMode = true
}

// stub for GET in dev mode
const cakeList = new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            data: [...CAKE_FIXTURES]
        });
    }, 5000);
});

// stub for POST in dev mode
const cakeData = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    ...data,
                    id: 999,
                }
            });
        }, 2500);
    })
};

export default new CakeDataService();