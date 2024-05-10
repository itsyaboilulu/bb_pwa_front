import { useDispatch } from "react-redux";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { closeDialog } from "Connectors/Redux/Actions/Dialog/DialogActions";



export default function ({dialog}){

    const dispatch = useDispatch();

    const _closeDialog = () => {
        dispatch(closeDialog());
    }

    return (
        <Dialog
            open={true}
            onClose={dialog?.config?.onClose ?? _closeDialog}
            maxWidth={dialog?.config?.maxWidth || 'md'}
            fullWidth
        >
            {dialog?.config?.title &&
                <DialogTitle>{dialog?.config?.title}</DialogTitle>
            }
            <DialogContent>
                {dialog.content}
            </DialogContent>
        </Dialog>
    )
}