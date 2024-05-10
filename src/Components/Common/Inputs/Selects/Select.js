import React from "react";
import { MenuItem, TextField } from '@mui/material'

export default function (props) {
    return (
        <TextField
            select
            {...props}
        >
            {props.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}