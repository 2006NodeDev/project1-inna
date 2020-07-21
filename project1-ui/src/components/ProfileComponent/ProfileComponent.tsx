import React, { FunctionComponent, useState, useEffect } from 'react'
import { UserDisplayComponent } from '../UserDisplayComponent/UserDisplayComponent'
import { User } from '../../models/User'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../remote/users-api/get-user-by-id'

export const ProfileComponent:FunctionComponent<any> = (props)=>{
    
    let [userProfile, changeUserProfile] = useState<null | User>(null)
    let {userId} = useParams()

    useEffect(()=>{
        let getUser = async ()=>{
            let userInfo = await getUserById(userId)
            changeUserProfile(userInfo)
        }

        if(!userProfile || userProfile.userId !== +userId){
            getUser()
            console.log('in the getUser')
        }
        console.log(userProfile)
    })

    
    return(
        (userProfile)?
        <UserDisplayComponent user={userProfile}/>
        :
        <div>
            <h3>User Not Found</h3>
        </div>
    )
}