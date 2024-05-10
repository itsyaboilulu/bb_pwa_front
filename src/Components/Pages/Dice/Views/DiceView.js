import _ from "lodash"

//material ui
import { Grid, Typography, Avatar } from "@mui/material";

//icons
import {ReactComponent as DiceOne} from 'Assets/Icons/DiceOne.svg';
import {ReactComponent as DiceTwo} from 'Assets/Icons/DiceTwo.svg';
import {ReactComponent as DiceThree} from 'Assets/Icons/DiceThree.svg';
import {ReactComponent as DiceFour} from 'Assets/Icons/DiceFour.svg';
import {ReactComponent as DiceFive} from 'Assets/Icons/DiceFive.svg';
import {ReactComponent as DiceSix} from 'Assets/Icons/DiceSix.svg';
import SunArrayEffect from "Components/Common/backgrounds/SunArrayEffect";

function DiceIconInternal ({dice, size=230, shinng=false}) {
    let Icon =  null;

    switch (parseInt(dice)) {
        case 1: Icon = DiceOne; break;
        case 2: Icon = DiceTwo; break;
        case 3: Icon = DiceThree; break;
        case 4: Icon = DiceFour; break;
        case 5: Icon = DiceFive; break;
        case 6: Icon = DiceSix; break;
        default: break;
    }

    return Icon ? 
        <Grid item >
            {shinng ? 
                <SunArrayEffect>
                    <Avatar
                        variant="rounded"
                        sx={{ width: size, height: size, backgroundColor: 'rgba(0,0,0,100)' }}
                    >
                        {Icon && <Icon fill='white'/>}
                    </Avatar>
                </SunArrayEffect> :
                <Avatar
                    variant="rounded"
                    sx={{ width: size, height: size, backgroundColor: 'rgba(0,0,0,100)' }}
                >
                    {Icon && <Icon fill='white'/>}
                </Avatar>
            }
        </Grid>
    : <></>
}

function DiceDetailsInternal ({dice, diceList, center=true}){
    let diceDetails = _.find(diceList, i => parseInt(i.value) === parseInt(dice))
    return !diceDetails ? <></> : (
        <>
            <Grid item xs={12} >
                <Typography
                    variant="h4"
                    textAlign={center && 'center'}
                >
                    {diceDetails.title}
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography
                    variant="body1"
                    textAlign={center && 'center'}
                >
                    {diceDetails.desc}
                </Typography>
            </Grid>
        </>
    )
}

function Dice ({dice, diceList, end, size=230, withDesc=true, withIcon=true}) {
    return !dice ? <></> : (
        <Grid container spacing={2}
            justifyContent='center'
        >
            {withIcon &&
                <DiceIconInternal dice={dice} size={size} shinng={end && parseInt(dice) === 6} />
            }
            {withDesc && 
                <DiceDetailsInternal dice={dice} diceList={diceList}/>
            }
        </Grid>
    )
}   

function DuelDiceView({
    dice, dice2, diceList, size=150
}){
    return (
        <>
            <Grid item xs={5} >
                <DiceIconInternal dice={dice2} size={size}/>
            </Grid>
            <Grid item xs={5} ml='auto'>
                <DiceIconInternal dice={dice} size={size}/>
            </Grid>
            {
                (
                    (dice === dice2) || (
                        parseInt(dice) === 6
                    )
                ) ? 
                    <>
                        <Grid item xs={12} >
                            <Typography
                                variant="h4"
                                textAlign='center'
                            >
                                Luck of the quarter irish
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography
                                variant="body1"
                                textAlign={'center'}
                            >
                                If the result is the same or a six no punishment is given.
                            </Typography>
                        </Grid>
                    </> :
                    <>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <DiceDetailsInternal center={false} dice={dice2} diceList={diceList} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <DiceDetailsInternal center={false} dice={dice} diceList={diceList} />
                            </Grid>
                        </Grid>
                    </>
            }
        </>
    )
}

export function DiceView({
    dice, end, dice2=null, diceList, diceType
}){ 
    return (
        <Grid container justifyContent='center' spacing={2}>
            {(end && dice2) ?
                <DuelDiceView dice={dice}  diceList={diceList} dice2={dice2}/>
                :
                <Grid item xs={12}>
                    <Dice
                        diceList={diceList}
                        dice={dice}
                        end={end}
                    />
                </Grid>
            }
        </Grid>
    )
}

export function DiceIcon(props){
    return <DiceIconInternal {...props} />
}