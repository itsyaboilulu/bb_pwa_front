import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// material ui
import { useTheme } from "@emotion/react";
import { Add } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Grid, IconButton, Typography, styled } from "@mui/material";

//components
import PotTransactions from "./PotTranactions";
import MembersTransactions from './MembersTransactions';
import AddToPotForm from '../Forms/AddToPotForm';
import TotalCard from "./Cards/TotalCard";

//app component
import API from 'Connectors/API';
import { deployDialog, closeDialog } from 'Connectors/Redux/Actions/Dialog/DialogActions';
import PaddedPaper from 'Components/Common/Paper/PaddedPaper';
import _ from 'lodash';

const SlimeButton = styled(Button)(({theme}) => ({
    fontSize: '12px',
    padding: 2,
    paddingLeft: 9,
    paddingRight: 9,
    ...theme.Button
}));

const FloatingButton = styled(IconButton)(({theme}) => ({
    position: 'fixed',
    right: 20,
    bottom: 75,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.padding,
    zIndex: 9999
}));

export default function Pot(){
    const theme = useTheme();

    const [view, setView] = React.useState('transactions');
    const [totals, setTotals] = React.useState({paid: 0, debit: 0, total: 0});
    const [transactions, setTransactions] = React.useState([]);

    const dispatch = useDispatch();

    const getTransactions = () => {
        API.get('/bank').then((data) => {
            setTransactions(data)

            setTotals({
                paid: parseFloat(_.sumBy(
                    _.filter(data, (transaction) => transaction.trans === 'Payment'),
                    transaction => parseFloat(transaction.amount)
                )), 
                debit: parseFloat(_.sumBy(
                    _.filter(data, (transaction) => transaction.trans === 'Debit'),
                    transaction => parseFloat(transaction.amount)
                )), 
                spent: parseFloat(_.sumBy(
                    _.filter(data, (transaction) => transaction.trans === 'Spend'),
                    transaction => parseFloat(transaction.amount)
                )), 
            }); 
        });
    }

    useEffect(()=>{ getTransactions(); }, [])

    return (
        <Box pt={1} >
            <Box pl={1.5} pr={1.5}>
                <Box pb={2}>
                    <PaddedPaper
                        onClick={()=>
                            dispatch(
                                deployDialog(
                                    <TotalCard totals={totals} />
                                )
                            )
                        }
                        style={{paddingBottom: 10}}
                    >
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item>
                                <Typography variant='body1'>Pot Total</Typography>
                            </Grid>
                            <Grid item ml='auto'>
                                <Typography lineHeight={0.7}  variant='h6' color='primary' textAlign='right'>£{parseFloat(totals.debit - parseFloat(totals.spent)).toFixed(2)}</Typography>
                                {parseFloat(totals.paid - parseFloat(totals.spent)) > 0 &&
                                    <Typography lineHeight={0.7} variant='caption' color='secondary' textAlign='right' width='100%'> Paid £{parseFloat(totals.paid - parseFloat(totals.spent)).toFixed(2)}</Typography>
                                }
                            </Grid>
                        </Grid>
                    </PaddedPaper>
                </Box>
                <Grid container>
                    <Grid item >
                        <ButtonGroup>
                            <SlimeButton theme={theme}
                                variant={ view === 'transactions' ? 'contained':'outlined' }
                                onClick={()=>setView('transactions')}
                            >
                                All 
                            </SlimeButton>
                            <SlimeButton 
                                variant={ view === 'debit' ? 'contained':'outlined' }
                                theme={theme}
                                onClick={()=>setView('debit')}
                            >Debit</SlimeButton>
                             <SlimeButton 
                                variant={ view === 'spend' ? 'contained':'outlined' }
                                theme={theme}
                                onClick={()=>setView('spend')}
                            >Spent</SlimeButton>
                        </ButtonGroup>
                    </Grid>
                    <Grid item style={{marginLeft: 'auto'}}>
                        <SlimeButton 
                            theme={theme}
                            variant={ view === 'members' ? 'contained':'outlined' }
                            onClick={()=>setView('members')}
                        >
                            Members 
                        </SlimeButton>
                    </Grid>
                </Grid>
            </Box>
            <Box pt={2}>
                {['spend', 'debit', 'transactions'].includes(view) &&
                    <PotTransactions
                        transactions={
                            view === 'transactions' ?
                                transactions :
                                transactions.filter( i => (
                                    view === 'spend' ?
                                        (
                                            i.trans === 'Spend'
                                        ) : i.trans !== 'Spend'
                                ))
                            }
                        deployDialog={(content,config)=>dispatch(deployDialog(content,config))}
                    />
                }
                {view === 'members' &&
                    <MembersTransactions
                        transactions={_.filter(transactions, i => i.trans !== 'Spend')}
                    />
                }
            </Box>
            <FloatingButton theme={theme}
                onClick={()=>
                    dispatch(
                        deployDialog(
                            <AddToPotForm closeDialog={
                                ()=>{
                                    dispatch(closeDialog());
                                    getTransactions();
                                }
                            }/>,
                            {
                                title: 'Add To pot',
                                onClose: ()=>{
                                    dispatch(closeDialog());
                                    getTransactions();
                                }
                            }
                        )
                    )
                }
            >
                <Add style={{fontSize: 50}} color='primary'/>
            </FloatingButton>
        </Box>
    )
}