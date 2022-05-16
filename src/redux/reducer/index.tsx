import { UserData } from "../../types/UserData";
import { UserFiles } from "../../types/UserFiles";
import {
    DELETE_USER_FILE,
    GET_USER_DATA,
    UPLOAD_USER_FILE,
} from "../actions/action-types";

const currentUser: UserData = {
    files: [],
    username: "undefined",
};

const currentUserFiles: UserFiles = {
    files: [],
};

const initialState = {
    currentUser,
    currentUserFiles,
};

export default function reducer(
    state = initialState,
    { type, payload }: { type: string; payload: UserData }
) {
    switch (type) {
        case GET_USER_DATA:
            const newcurrent = payload.username
                ? payload
                : { files: [], username: "" };

            return {
                ...state,
                currentUser: newcurrent,
            };

        case UPLOAD_USER_FILE:
            const updating: boolean = !!state.currentUser.files.find(
                (file) => file.name === payload.files[0].name
            );

            const updated =
                updating &&
                state.currentUser.files.map((file) => {
                    if (file.name === payload.files[0].name) {
                        file.time = Date.now();
                        return file;
                    } else return file;
                });

            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    files: updating
                        ? updated
                        : [
                              ...state.currentUser.files,
                              { time: Date.now(), name: payload.files[0].name },
                          ],
                },
            };
        case DELETE_USER_FILE:
            let delFiles = state.currentUser.files.filter(
                (file) => file.name !== payload.files[0].name
            );

            return {
                ...state,
                currentUser: {
                    username: state.currentUser.username,
                    files: delFiles,
                },
            };
        default:
            return state;
    }
}
