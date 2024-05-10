import React from 'react';

// material-ui
import { Paper, BottomNavigation , BottomNavigationAction  } from '@mui/material';
import { Casino, CurrencyPound } from '@mui/icons-material'; 

const Footer = ({ setPage, page }) => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} elevation={3}>
        <BottomNavigation
            showLabels
            value={page}
            onChange={(event, newValue) => {
              setPage(newValue);
            }}
        >
            <BottomNavigationAction value='dice' label="Dice" icon={<Casino />} />
            <BottomNavigationAction value='pot' label="Pot" icon={<CurrencyPound />} />
        </BottomNavigation>
    </Paper>
  );
};

export default Footer;
