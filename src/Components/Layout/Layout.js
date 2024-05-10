
import React from 'react';

// material-ui
import { Box, CssBaseline } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import AuthHelper from 'Helpers/AuthHelper';

// components
import Login from 'Components/Pages/Login/Views/Login';
import { clearDialog } from 'Connectors/Redux/Actions/Dialog/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import DispachItems from './DispachItems/DispachItems';
import Footer from './Footer';
import Router from './Router';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 0,
    paddingTop: 16,
    paddingBottom: 50,
    [theme.breakpoints.up('md')]: {
        marginLeft: 0,
        width: `calc(100% - 0px)`
    },
    [theme.breakpoints.down('md')]: {
        width: `calc(100% - 0px)`,
        paddingLeft: '0px',
        marginRight: '0px'
    },
    [theme.breakpoints.down('sm')]: {
        width: `calc(100% - 0px)`,
        paddingLeft: '0px',
        marginRight: '0px'
    }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();

    const [page, _setPage] = React.useState('dice')
    const [loggedIn, setLoggedIn] = React.useState(AuthHelper.isLoggedIn());
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    function setPage(pageId){
        if (pageId !== page){
            //clear dialogs
            dispatch( clearDialog() );
            _setPage(pageId);
        }
    }

    return (!loggedIn) ? <Login setLoggedIn={setLoggedIn}/> : (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            {/* <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                }}
            >
                <Toolbar>
                    <Header/>
                </Toolbar>
            </AppBar> */}

            {/* main content */}
            {state.user?.token?.token &&
                <Main theme={theme} >
                    <Router setPage={setPage} page={page}/>
                </Main>
            }

            {/* redux */}
            <DispachItems state={state}/>

            {/* footer */}
            <Footer setPage={setPage} page={page}/>
        </Box>
    );
};

export default MainLayout;
