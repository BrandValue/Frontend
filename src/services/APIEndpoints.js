import axios from "axios";

const URL = 'http://localhost:5000';

export const getRequest = (uri) => {
    return new Promise((resolve, reject) => {
        axios.get(`${URL}/${uri}`)
            .then((response) => {
                resolve({
                    data: response.data,
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                    config: response.config
                });
            }).catch((err) => {
            reject(err);
        });
    });
}
