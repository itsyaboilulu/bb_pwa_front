

// material-ui
import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import PaddedPaper from 'Components/Common/Paper/PaddedPaper';

// project imports
import LoginForm from './../Forms/LoginForm';

// components


export default function ({setLoggedIn}){
    return (
        <Box >
            <CssBaseline />
            <Grid container
                justifyContent='center'
                style={{paddingTop: '24px'}}

            >
                <Grid item xs={11} md={4} >
                    <PaddedPaper>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant='h5' style={{textAlign: 'center'}}>
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LoginForm
                                    setLoggedIn={setLoggedIn}
                                />
                            </Grid>
                        </Grid>
                    </PaddedPaper>
                </Grid>
            </Grid>
        </Box>
    )
}
