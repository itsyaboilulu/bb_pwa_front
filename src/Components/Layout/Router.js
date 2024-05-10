import React from "react";

//pages
import Dice from "Components/Pages/Dice/Views/Dice"
import Pot from "Components/Pages/Pot/Views/Pot";

export default function ({page, setPage}){

    const passInProps = {
        page, setPage
    }

    switch (page) {
        case "dice": return ( <Dice {...passInProps} />)
        case 'pot': return ( <Pot {...passInProps} /> )
        // case 'corona' :
        //     return (
        //         <SunArrayEffect>
        //             <DiceIcon 
        //                 dice={6}
        //                 size={200}
        //             />
        //         </SunArrayEffect>
        //     )
    }
}