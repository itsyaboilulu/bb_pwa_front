import { CONFIRMATION_DEPLOY, CONFIRMATION_CLEAR} from 'Connectors/Redux/Types/Confirmation/ConfirmationTypes';
import { v1 } from "uuid";

const initialState = {
    key: v1(),
    show: false,
    text: null,
    success: null,
    failure: null,
    config: null,
}


export default function dialogReducer(state = initialState, options) {
    switch (options.type) {
        case CONFIRMATION_DEPLOY:
            return { ...state, ...options.action, key: v1(), show: true }
        case CONFIRMATION_CLEAR:
            return initialState
        default:
            return state;
    }
}