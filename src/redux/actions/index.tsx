import axios from "axios";
import { UserData } from "../../types/UserData";
import {
    DELETE_USER_FILE,
    GET_USER_DATA,
    UPLOAD_USER_FILE,
} from "./action-types";

export function getUserData(user: string) {
    return function (dispatch: (arg0: { type: string; payload: {} }) => {}) {
        return axios
            .get(
                `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${user}.json`
            )
            .then((response) => {
                console.log("ENTRE AL THEN");

                console.log({ response });

                dispatch({
                    type: GET_USER_DATA,
                    payload: response.data,
                });
            })
            .catch((err) => {
                console.log("ENTRE AL CATCH");

                console.log(err);
            });
    };
}

export function uploadUserFile(file: File, username: string) {
    return function (
        dispatch: (arg0: {
            type: string;
            payload: { username: string; files: string[] };
        }) => void
    ) {
        const formData = new FormData();
        formData.append("file", file);

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "image/jpeg" },
            data: file,
            redirect: "follow",
        };

        return axios(
            `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${username}/${file.name}`,
            requestOptions
        )
            .then((res) => {
                console.log(res);

                dispatch({
                    type: UPLOAD_USER_FILE,
                    payload: { username, files: [file.name] },
                });
            })
            .catch((err) => alert({ err }));
    };
}

export function uploadUserData(username: string, currentUser: UserData) {
    return function () {
        const raw = JSON.stringify(currentUser);

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            data: raw,
            redirect: "follow",
        };

        return axios(
            `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${username}.json`,
            requestOptions
        )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
}

export function deleteUserFile(file: string, username: string) {
    return function (
        dispatch: (arg0: {
            type: string;
            payload: { username: string; files: string[] };
        }) => any
    ) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow",
        };

        return axios(
            `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${username}/${file}`,
            requestOptions
        )
            .then(() =>
                dispatch({
                    type: DELETE_USER_FILE,
                    payload: { username, files: [file] },
                })
            )
            .catch((err) => console.log(err));
    };
}
