import { useDispatch } from "react-redux";

import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from "@mui/material";
import { clearConfirmation } from "Connectors/Redux/Actions/Confirmation/ConfirmationActions";



export default function ({confirmation}){

    console.log(confirmation)

    const dispatch = useDispatch();

    const onFail = () => {
        if (confirmation?.faliure) {confirmation?.faliure()}
        dispatch(clearConfirmation());
    }

    const onSuccess = () => {
        if (confirmation?.success) {confirmation?.success()}
        dispatch(clearConfirmation());
    }

    return (
        <Dialog
            open={true}
            onClose={onFail}
            maxWidth={'sm'}
            fullWidth
        >
            {confirmation?.config?.title &&
                <DialogTitle>{confirmation?.config?.title}</DialogTitle>
            }
            <DialogContent>
                <Typography>
                    {confirmation?.text ?? 'Are you sure?'}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={onFail}
                >
                    {confirmation?.config?.yesNo ? 'No' : 'Cancel'}
                </Button>
                <Button
                    variant="contained"
                    onClick={onSuccess }
                >
                    {confirmation?.config?.yesNo ? 'Yes' : 'Continue'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}