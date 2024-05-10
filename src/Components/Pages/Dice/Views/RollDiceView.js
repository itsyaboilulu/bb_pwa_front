import React from "react";
import API from "Connectors/API";

//Components
import { DiceView } from "./DiceView";
import FloatingBottomAction from 'Components/Common/Floating/FloatingBottomAction';

//material ui
import { Button, Grid } from "@mui/material";
import { rollDice } from "Helpers/DiceHelper";

const initialState = ()=>({
    dice: 0,
    diceEnd: false,
    secondRoll: false,
    rolls: [],
    parentRollId: 0,
    klMode: true,
    blockGamble: false,
})

class RollDiceView extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState();
        this.timeout = null;
    }

    componentDidMount(){
        this.startRollDice();
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    startRollDice(){
        clearTimeout(this.timeout);
        let rolls = 0;
        for (let i=0; i<rollDice(); i++){
            rolls += rollDice();
        }
        this.setState({ diceEnd: 0 },()=>this.rollDice(rolls))
    }

    rollDice(rolls) {
        this.setState({
            dice: rollDice()
        }, ()=>{
            if (rolls === 0) {
                this.endRollDice();
            } else {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(()=>this.rollDice(rolls-1),250)
            }
        });
    }
    endRollDice(){
        clearTimeout(this.timeout);
        this.logRoll();
        this.setState({
            diceEnd: 1
        })
    }

    logRoll(){
        API.post(
            '/dice/roll',
            {
                roll: this.state.dice,
                type: this.state.klMode ? 'KennyLoggins' : (
                    this.props.type === 'shame' ? 'Shame' : (
                    this.props.type === 'group' ? 'Group' : 'KennyLoggins')
                ),
                parent: this.state.parentRollId,
                target: this.props.target
            }
        ).then(({success})=>{
            this.setState({
                parentRollId: success
            })
        })
    }

    reroll = () => {
        this.setState({
            ...initialState(),
            klMode: this.state.klMode,
            parentRollId: this.state.parentRollId,
            secondRoll: true,
            rolls: [ ...this.state.rolls, this.state.dice]
        }, this.startRollDice)
    }

    acceptPunishment = () => {
        const {dice, rolls, secondRoll} = this.state
        if (
            ( secondRoll ?
                (
                    (parseInt(dice) === 2 || parseInt(rolls[0]) === 2) && 
                    (parseInt(dice) !== parseInt(rolls[0])) &&
                    (parseInt(dice) !== 6)
                ) :
                parseInt(dice) === 2
            ) && this.props.type === 'shame'
        ){
            API.post(`/dice/logMIAI`,{target: this.props.target}).then(this.props.onClose)
        } else {
            this.props.onClose();
        }
    }

    acceptPrize = () => {
        if (parseInt(this.state.dice) === 2){
            API.post(`/dice/logFreeParking`,{target: this.props.target}).then(this.props.onClose)
        } else {
            this.props.onClose();
        }
    }

    declinePrize = () => {
        this.props.onClose();
    }

    klRoll = () => {
        this.setState({
            klMode: true
        },this.reroll)
    }

    render() {
    
        const {secondRoll, diceEnd, rolls, dice, klMode, blockGamble} = this.state;
        const { diceList, type } = this.props;

        return (
            <>
                <Grid container
                    alignContent='center'
                    alignItems='center'
                    justifyContent='center'
                    spacing={4}
                    pt={6}
                >
                    <Grid item xs={9}>
                        <DiceView
                            diceList={diceList[ klMode ?
                                'KennyLoggins' : (
                                    type === 'shame' ? 'Shame' : (
                                        type === 'group' ? 'Group' : 'Shame'
                                    )
                                )
                            ]}
                            dice={dice}
                            type={type}
                            end={diceEnd}
                            dice2={(secondRoll && diceEnd) && rolls[0]}
                        />
                    </Grid>
                </Grid>
                {!!diceEnd &&
                    <>
                        <FloatingBottomAction>
                            <Grid container justifyContent='center'>
                                {klMode ? 
                                    <>
                                        <Grid item xs={10}>
                                            {parseInt(dice) === 6 ?
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={()=>{
                                                        this.setState({
                                                            klMode: false,
                                                            rolls: [],
                                                            secondRoll: false,
                                                            blockGamble: true,
                                                        }, this.startRollDice)
                                                    }}
                                                >
                                                    Roll Punishment
                                                </Button> :
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={this.acceptPrize}
                                                >
                                                    Accept My Prize
                                                </Button>
                                            }
                                        </Grid>
                                        {parseInt(dice) === 2 &&
                                            <Grid item xs={10} mt={2}>
                                                <Button
                                                    mt={2}
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={this.declinePrize}
                                                >Decline my prize</Button>
                                            </Grid>
                                        }
                                    </> :
                                    <>
                                        {!(parseInt(dice) === 6 && parseInt(rolls[0]) === 6) &&
                                            <Grid item xs={10}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={this.acceptPunishment}
                                                >
                                                    {
                                                        (secondRoll ? 
                                                            (
                                                                parseInt(rolls[0]) === parseInt(dice) ||
                                                                parseInt(dice) === 6
                                                            ) :
                                                            parseInt(dice) === 6
                                                        ) ?
                                                        'No Punishment' : `Accept Punishment${secondRoll ? 's' : ''}`
                                                    }
                                                </Button>
                                            </Grid>
                                        }
                                        {type === 'shame' && !!!secondRoll && !blockGamble &&
                                            <Grid item xs={10} mt={2}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    onClick={this.reroll}
                                                >
                                                    {dice === 6 ?
                                                        'Yusif Islam' : 'Gamble'
                                                    }
                                                </Button>
                                            </Grid>
                                        }
                                        {type === 'shame' && !!secondRoll &&
                                            (parseInt(dice) === 6 && parseInt(rolls[0]) === 6) &&
                                            <Grid item xs={10} mt={2}>
                                                <Button
                                                    fullWidth
                                                    onClick={this.klRoll}
                                                    variant='contained'
                                                    style={{
                                                        backgroundColor: '#FFD700',
                                                        color: 'black'
                                                    }}
                                                >
                                                    kenny Loggins
                                                </Button>
                                            </Grid>
                                        }
                                    </>
                                }
                            </Grid>
                        </FloatingBottomAction>
                    </>
                }
            </>
        )
    }
}

export default RollDiceView;