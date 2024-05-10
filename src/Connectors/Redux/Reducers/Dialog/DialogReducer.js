import { DIALOG_ADD, DIALOG_CLEAR, DIALOG_REMOVE } from 'Connectors/Redux/Types/Dialog/DialogTypes';
import { v1 } from "uuid";

const dialogInitialState = {
    open: true,
    content: null,
    config: null,
};

const initialState = {
    key: v1(),
    dialogs: [],
    activeDialog: null
}


export default function dialogReducer(state = initialState, options) {
    switch (options.type) {
        case DIALOG_ADD:
            let dialog = {
                ...dialogInitialState,
                ...options.action
            }
            return {
                ...state,
                dialogs: [...state.dialogs, dialog],
                key: v1()
            }
        case DIALOG_CLEAR:
            return initialState;
        case DIALOG_REMOVE:
            return {
                ...state,
                dialogs:  state.dialogs.length > 1 ? state.dialogs.slice(-1) : [],
                key: v1()
            }
        default:
            return state;
    }
}