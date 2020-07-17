import React, { FunctionComponent, useState } from 'react'
import Button from '@material-ui/core/Button'
import { TitleComponent } from '../TitleComponent/TitleComponent'

export const ClickerComponent : FunctionComponent<any> = (props) => {
    
    const [clicks, changeClicks] = useState(0)

    return(
        <div>
            <TitleComponent size='small' title={`Welcome! You have ${clicks} number of clicks`}/>
            <Button variant="contained" color="primary" onClick={()=>changeClicks(clicks+1)}>
                Click
            </Button>
        </div>
    )

}