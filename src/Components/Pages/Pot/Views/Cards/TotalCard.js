import { Grid, Typography } from '@mui/material';
import PaddedPaper from 'Components/Common/Paper/PaddedPaper';
import Constants from 'Constants';

 const TotalCard = ({totals}) =>
    <Grid container>
        <Grid item xs={12} mb={2}>
            <PaddedPaper>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>Bank Details</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body2'>
                            <Grid container>
                                <Grid item xs={6}>
                                    Bank
                                </Grid>
                                <Grid item xs={6} textAlign='right'>
                                    {Constants.bankName}
                                </Grid>
                                <Grid item xs={6}>
                                    Name
                                </Grid>
                                <Grid item xs={6} textAlign='right'>
                                    {Constants.BankHolder}
                                </Grid>
                                <Grid item xs={6}>
                                    Account
                                </Grid>
                                <Grid item xs={6} textAlign='right'>
                                    {Constants.bankNumber}
                                </Grid>
                                <Grid item xs={6}>
                                    Sort
                                </Grid>
                                <Grid item xs={6} textAlign='right'>
                                    {Constants.bankSort}
                                </Grid>
                            </Grid>
                        </Typography>
                    </Grid>
                </Grid>
            </PaddedPaper>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='body2'>
                Pot Total
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='body1' style={{textAlign: 'right'}}>
                £{parseFloat(totals.debit).toFixed(2)}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='body2'>
                Paid In
            </Typography>
        </Grid>
        <Grid item ml='auto'>
            <Typography variant='body1' style={{borderBottom: `1px solid white`, textAlign: 'right'}}>
                +£{parseFloat(totals.paid).toFixed(2)}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='body2'>
                Spent
            </Typography>
        </Grid>
        <Grid item ml='auto'>
            <Typography variant='body1' style={{borderBottom: `1px solid white`, borderTop: `1px solid white`, textAlign: 'right'}}>
                -£{parseFloat(totals.spent).toFixed(2)}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='body2'>
                Left To Pay
            </Typography>
        </Grid>
        <Grid item ml='auto'>
            <Typography variant='body1' style={{borderTop: `1px solid white`, textAlign: 'right'}}>
                £{parseFloat(Math.abs(totals.paid - totals.debit) - parseFloat(totals.spent)).toFixed(2)}
            </Typography>
        </Grid>
    </Grid>


export default TotalCard;