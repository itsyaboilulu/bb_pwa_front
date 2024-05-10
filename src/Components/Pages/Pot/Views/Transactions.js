
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";

//material ui
import { Avatar, Divider, Grid, List, ListItem, ListSubheader, Typography } from "@mui/material";

//components
import DebitCard from "./Cards/DebitCard";
import PaidCard from "./Cards/PaidCard";
import SpendCard from "./Cards/SpendCard";

//app components
import MemberAvatar from "Components/Common/Members/MemberAvatar";
import _ from 'lodash';
import moment from "moment";
import { Paid } from "@mui/icons-material";
import { deployDialog } from "Connectors/Redux/Actions/Dialog/DialogActions";

const TypeToFriendly = {
    'Bank' : 'Bank transfer', 
    'Bet' : 'Lost Bet',
    'Dice' : 'Dice Roll'
}

export default function Transactions({transactions}){

    let theme = useTheme();

    let dispatch = useDispatch();
    let showDialog = (content, config)=>dispatch(deployDialog(content, config))

    return (
        <List style={{paddingBottom: 0}}>
            {_.map(_.uniqBy(transactions, i => i.date), (t, index) => 
                <>
                    <ListSubheader
                        style={{paddingLeft: 16}}
                    >
                        <Typography gutterBottom variant="body2">
                            {moment(t.date).calendar().split(" at")[0]}
                        </Typography>
                    </ListSubheader>
                    <Divider/>
                    {_.map(_.filter(transactions, i => i.date === t.date), j => {
                        // let Icon = Muicon[j.icon ?? 'Add'];
                        return (
                            <ListItem
                                style={{
                                    backgroundColor: '#1e1e1e',
                                    color: 'white'
                                }} 
                                theme={theme}
                                onClick={()=>{
                                    showDialog(
                                            j.trans === 'Debit' ?
                                                <DebitCard transaction={j} /> :
                                                j.trans === 'Pais' ?
                                                    <PaidCard transaction={j} /> :
                                                    <SpendCard transaction={j} />
                                        )
                                    }
                                }
                            >
                                <Grid container spacing={2} alignItems={'center'} >
                                    <Grid item >
                                        {/* <Icon style={{marginTop: 2}} /> */}
                                        {j.trans === 'Spend' ?
                                        //  <Paid style={{fontSize: 51, marginLeft: -6}} /> 
                                            <Avatar children={<Paid/>}/>
                                        : <MemberAvatar member={j.payeeId}/> }
                                    </Grid>
                                    <Grid item
                                            style={{
                                            maxWidth: '57vw',
                                            maxHeight: 70,
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            width: 'auto'
                                        }}
                                    >
                                        <Typography variant={j?.data?.notes ? 'body2' : "body1"}>{j.vender ? j.vender : (TypeToFriendly[j.type] ?? j.type)}</Typography>
                                        {
                                            !!j?.data?.notes &&
                                            <Typography variant="caption">{_.capitalize(j?.data?.notes)}</Typography> 
                                        }
                                    </Grid>
                                    <Grid item ml='auto'>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                            style={{color: j.trans !== 'Debit' && theme.palette[(j.trans === 'Payment' ? 'success' : 'error')].light}}
                                        >{
                                            j.trans === 'Spend' ?
                                            <span>-</span> : 
                                            <span>+</span>
                                        }£{parseFloat(j.amount).toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        )
                    })}
                    {index < (_.uniqBy(transactions, i => i.date).length - 1) && <Divider style={{marginBottom: 8}}/>}
                </>
            )}
        </List>
    )
}