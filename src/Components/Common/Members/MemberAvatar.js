import { Avatar } from "@mui/material";

import A1 from 'Assets/Files/Members/1/avatar.jpg'
import A2 from 'Assets/Files/Members/2/avatar.jpg'
import A3 from 'Assets/Files/Members/3/avatar.jpg'
import A4 from 'Assets/Files/Members/4/avatar.jpg'
import A5 from 'Assets/Files/Members/5/avatar.jpg'

export default function (props) {
    let img = null;
    switch (parseInt(props.member)) {
        case 1: img = A1; break;
        case 2: img = A2; break;
        case 3: img = A3; break;
        case 4: img = A4; break;
        case 5: img = A5; break;
    }
    return (
        <Avatar
            src={img}
            {...props}
        />
    )
}