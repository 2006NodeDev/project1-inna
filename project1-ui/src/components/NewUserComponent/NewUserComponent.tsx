import React, { FunctionComponent, SyntheticEvent } from 'react'
import { Button } from '@material-ui/core'

// did not finish updating this, got behind in class

export const NewUserComponent:FunctionComponent<any> = (props) => {
    

    const submitUser = (e:SyntheticEvent)=>{
        e.preventDefault()
    }

    return(
        <div>
            <Button variant='contained' ></Button>
        </div>
    )
}