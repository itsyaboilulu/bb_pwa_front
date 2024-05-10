import { LISTS_SET } from 'Connectors/Redux/Types/Lists/ListsTypes';

const initialState = {  
    users: [],
    reasons: [],
}


export default function dialogReducer(state = initialState, options) {
    switch (options.type) {
        case LISTS_SET:
            return {
                ...state,
                ...options.action
            };
        default:
            return state;
    }
}