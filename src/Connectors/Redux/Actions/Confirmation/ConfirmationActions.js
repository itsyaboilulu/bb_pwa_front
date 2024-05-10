import { CONFIRMATION_DEPLOY, CONFIRMATION_CLEAR} from 'Connectors/Redux/Types/Confirmation/ConfirmationTypes';

export function deployConfirmation( text, success, failure=null, config=null ) {
    return {
        type: CONFIRMATION_DEPLOY,
        action: {
            text, success, failure, config
        }
    }
}

export function clearConfirmation(  ) { 
    return {
        type: CONFIRMATION_CLEAR,
        action: null
    }
}
