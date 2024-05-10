// material-ui
import { Paper } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const Main = styled(Paper)(({ theme }) => ({
    padding: '16px',
    width: '100%',
}))

export default function (props) {
    const theme = useTheme();
    return (
        <Main theme={theme} {...props} >
            {props.children}
        </Main>
    )
}