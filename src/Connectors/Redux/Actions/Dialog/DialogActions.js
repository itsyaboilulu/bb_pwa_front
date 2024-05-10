import { DIALOG_ADD, DIALOG_CLEAR, DIALOG_REMOVE } from 'Connectors/Redux/Types/Dialog/DialogTypes';

export function deployDialog( content, config) {
    return {
        type: DIALOG_ADD,
        action: {
            content: content,
            config: config
        }
    }
}

export function closeDialog() {
    return {
        type: DIALOG_REMOVE
    }
}

export function clearDialog() {
    return {
        type: DIALOG_CLEAR
    }
}
