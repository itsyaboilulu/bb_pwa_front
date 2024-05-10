import { Grid, List, ListItem, ListSubheader, Typography } from "@mui/material";

import _ from 'lodash';

//icons
import { DiceIcon } from "./DiceView";

export default function({dice, special}){
    return (
        <>
            <List>
                <ListSubheader>Rolls</ListSubheader>
                {
                    _.map(dice, ({value, title, desc}) => {
                        return (
                            <ListItem
                                style={{
                                    backgroundColor: '#1e1e1e',
                                    color: 'white'
                                }}
                            >
                                <Grid container spacing={2} >
                                    <Grid item style={{ width: 60 }}>
                                        <DiceIcon dice={value} size={45} />
                                    </Grid>
                                    <Grid item style={{ width: 'calc(100% - 65px)'}}>
                                        <Typography variant={"body1"}>{title}</Typography>
                                        <Typography variant="caption">{desc}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        )
                    })
                }
                {special &&
                    <>
                        <ListSubheader>Special</ListSubheader>
                        {
                            _.map(special, ({Icon, title, desc}) => {
                                return (
                                    <ListItem
                                        style={{
                                            backgroundColor: '#1e1e1e',
                                            color: 'white'
                                        }}
                                    >
                                        <Grid container spacing={2} >
                                            <Grid item style={{ width: 60 }}>
                                                <Icon />
                                            </Grid>
                                            <Grid item style={{ width: 'calc(100% - 65px)'}}>
                                                <Typography variant={"body1"}>{title}</Typography>
                                                <Typography variant="caption">{desc}</Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            })
                        }
                    </>
                }
            </List>
        </>
    )
}