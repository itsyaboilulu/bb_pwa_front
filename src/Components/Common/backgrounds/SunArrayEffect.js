import React from 'react';
import './CSS/sunArrayEffect.css';
import { Box } from '@mui/material';
import _ from 'lodash';

export default function SunArrayEffect(props) {
    return (
        <Box id="sun">
            {
                _.map(_.range(5), r => 
                    <Box class={`ray ray${r}`}
                    ></Box>     
                )
            }

            <Box p={8} 
                style={{
                    position: 'relative',

                }}
            >
                {props.children}
            </Box>
        </Box>
    )
}