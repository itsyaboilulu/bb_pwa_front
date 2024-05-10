
//material ui
import { Grid } from "@mui/material";

//components
import Transactions  from "./Transactions";

export default function PotTransactions({
    transactions
}){
    return (
        <>
            <Grid item xs={12}>
                <Transactions transactions={transactions} />
            </Grid>
        </>
    )
}