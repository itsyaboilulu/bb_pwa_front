import { Grid, TextField, Typography } from "@mui/material";
import _ from "lodash";
import moment from "moment";

export default ({transaction}) => 
    <Grid container>
        <Grid container>
            {
                _.map(
                    [
                        {
                            name: 'Type',
                            value: transaction.trans
                        },
                        {
                            name: 'Date',
                            value: moment(transaction.date).format('DD/MM/YYYY')
                        },
                        {
                            name: 'Member',
                            value: _.capitalize(transaction.payee)
                        },
                        {
                            name: 'Amount',
                            value: `£${parseFloat(transaction.amount).toFixed(2)}`
                        },
                        {
                            name: 'Reason',
                            value: transaction.data.reason
                        },
                    ],
                    ({name, value}) => 
                        <Grid item container>
                            <Grid item>
                                {name}
                            </Grid>
                            <Grid item ml='auto'>
                                {value}
                            </Grid>
                        </Grid>
                )
            }
        </Grid>
        {!!transaction.data.notes &&
            <Grid item xs={12} pt={2}>
                <TextField 
                    fullWidth
                    disabled
                    variant='outlined'
                    value={transaction.data.notes}
                    label={'Notes'}
                    multiline
                />
            </Grid>
        }
        <Grid item ml='auto' pt={1}>
            <Typography variant="caption">
                Added {moment(transaction.data.added).calendar()}
            </Typography>
        </Grid>
    </Grid>