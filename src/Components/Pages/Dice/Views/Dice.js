import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import { Box, Grid, Button, ButtonGroup, Avatar } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

import DiceRules from './DiceRules'
import RollDiceView from './RollDiceView';
import FloatingBottomAction from "Components/Common/Floating/FloatingBottomAction";

export default function Dice(){

    const [dice, setDice] = React.useState('shame');
    const [showRoll, setShowRoll] = React.useState(false);

    const diceList = useSelector(state => state.lists.dice);
    const users = useSelector(state => state.lists.users);
    const user = useSelector(state => state.user);

    const [diceTarget, setDiceTarget] = React.useState(user.user.id)

    return (
        <Box pt={1} >
            {!showRoll &&
                <Grid container>
                    <Grid item xs={12}>
                        <Box pl={2} pr={2}>
                            <ButtonGroup fullWidth>
                                {
                                    dice === 'shame' ?
                                    <Button
                                        variant={'contained'}
                                    >
                                        <select 
                                            onChange={e=>setDiceTarget(e.target.value)}
                                            value={diceTarget}
                                            style={{
                                                backgroundColor: '#ffffff00',
                                                border: `0px solid black`,
                                                width: '100%',
                                                textAlign: 'center',
                                                fontSize: 17
                                            }}
                                        >
                                            {_.map(users, u => 
                                                <option
                                                    value={u.id}
                                                >{parseInt(user.user.id) === parseInt(u.id) ? 'DICE OF SHAME' : `DOS: ${_.capitalize(u.name)}`}</option>
                                            )}
                                        </select>
                                        {/* <Select
                                            value={diceTarget}
                                            options={
                                                _.map(users, u => ({
                                                    value: u.id,
                                                    label: parseInt(user.user.id) === parseInt(u.id) ? 'DICE OF SHAME' : `DOS: ${_.capitalize(u.name)}`
                                                }))
                                            }
                                            fullWidth
                                            p={0}
                                            variant="standard"
                                            onChange={e=>setDiceTarget(e.target.value)}
                                        /> */}
                                    </Button> :
                                    <Button
                                        variant={'outlined'}
                                        onClick={()=>setDice('shame')}
                                    >Dice Of Shame</Button>
                                }
                                <Button
                                    variant={dice === 'group' ? 'contained' : 'outlined'}
                                    onClick={()=>setDice('group')}
                                >Group Dice</Button>
                            </ButtonGroup>
                        </Box>
                    </Grid>
                    <Grid item xs={12} style={{paddingBottom: 75}}>
                        {
                            dice === 'shame' &&
                            <DiceRules dice={diceList.Shame}
                                special={
                                    [
                                        {
                                            Icon:   (()=> <Avatar>
                                                        <ReplayIcon color='white'/>
                                                    </Avatar>),
                                            title: 'The gambler',
                                            desc: 'The member can reroll there rolled dice, if the result is the same or a six no punishment is given. Rerolling a six unlocks potention for the loggins dice'
                                        }
                                    ]
                                }
                            />
                        }
                        {
                            dice === 'group' &&
                            <DiceRules dice={diceList.Group} />
                        }
                    </Grid>
                    <FloatingBottomAction>
                        <Grid container justifyContent='center'>
                            <Grid item xs={10}>
                                <Button variant="contained" fullWidth
                                    onClick={()=>setShowRoll(true)}
                                >Roll Dice</Button>
                            </Grid>
                        </Grid>
                    </FloatingBottomAction>
                </Grid>
            }
            {showRoll &&
                <RollDiceView 
                    type={dice} 
                    diceList={diceList}
                    onClose={()=>setShowRoll(false)}
                    target={diceTarget}
                />
            }
            
        </Box>
    )
}