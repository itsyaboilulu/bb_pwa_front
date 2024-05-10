import { Box } from "@mui/material";
import styled from "@emotion/styled";

const FloatingBox = styled(Box)(({ theme }) => ({
    position: 'fixed', 
    bottom: 60, 
    zIndex: 999, 
    width: '100%'
}))


export default function FloatingBottomAction(props){
    return (
        <FloatingBox p={2} {...props}/>
    )
}