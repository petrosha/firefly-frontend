import axios from 'axios';

const baseUrl = '/api/users/';

let netPostAction = (id,data) => {
    return axios
        .post(baseUrl+id, data)
        .then(response => response.data)
//        .catch(error => console.log("Network error: ", error));
}

let netGetStatus = (id) => {
    return axios
        .get(baseUrl+id)
        .then(response => response.data)
//        .catch(error => console.log("Error: ", error));
}

export default {
    netPostAction,
    netGetStatus,
}