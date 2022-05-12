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
            console.log({ payload });
            const newcurrent = payload.username
                ? payload
                : { files: [], username: "" };
            console.log({ newcurrent });

            return {
                ...state,
                currentUser: newcurrent,
            };

        case UPLOAD_USER_FILE:
            if (
                !state.currentUser.files.find(
                    (file) => file === payload.files[0]
                )
            )
                state.currentUser.files.push(payload.files[0]);

            return {
                ...state,
            };
        case DELETE_USER_FILE:
            console.log(state.currentUser.files);

            state.currentUser.files = state.currentUser.files.filter(
                (file) => file !== payload.files[0]
            );
            state.currentUser.files.concat([]);
            console.log(state.currentUser.files);
            return {
                ...state,
            };
        default:
            return state;
    }
}
