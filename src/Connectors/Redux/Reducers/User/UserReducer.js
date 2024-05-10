import { USER_ADD } from 'Connectors/Redux/Types/User/UserTypes';
import AuthHelper from 'Helpers/AuthHelper';
import { v1 } from "uuid";


const initialState = {
    key: v1(),
    user: {
        username: '',
        id: '',
    },
    users: null,
    token: {
        token: '',
        expire: '',
    }
}


export default function dialogReducer(state = initialState, options) {
    switch (options.type) {
        case USER_ADD:
            AuthHelper.setUserToken(options.action.token)
            return {
                ...state,
                user: options.action.user,
                token: {
                    ...state.token,
                    token: options.action.token
                }
            };
        default:
            return state;
    }
}