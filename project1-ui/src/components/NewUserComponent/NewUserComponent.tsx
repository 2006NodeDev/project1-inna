import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { toast } from 'react-toastify'
import { User } from '../../models/User'
import { userSaveUser } from '../../remote/users-api/user-save-user'

// did not finish updating this, got behind in class

export const NewUserComponent:FunctionComponent<any> = (props) => {
    let [username, changeUsername] = useState('')
    let [password, changePassword] = useState('')
    let [confirmPassword, changeConfirmPassword] = useState('')
    let [firstName, changeFirstName] = useState('')
    let [lastName, changeLastName] = useState('')
    let [email, changeEmail] = useState('')
    let [image, changeImage] = useState(null)

    const updateUsername = (e:any) => {
        e.preventDefault()
        changeUsername(e.currentTarget.value)
    }

    const updatePassword = (e:any) => {
        e.preventDefault()
        changePassword(e.currentTarget.value)
    }

    const updateConfirmPassword= (e:any) => {
        e.preventDefault()
        changeConfirmPassword(e.currentTarget.value)
    }

    const updateFirstName = (e:any) => {
        e.preventDefault()
        changeFirstName(e.currentTarget.value)
    }

    const updateLastName = (e:any) => {
        e.preventDefault()
        changeLastName(e.currentTarget.value)
    }

    const updateEmail = (e:any) => {
        e.preventDefault()
        changeEmail(e.currentTarget.value)
    }

    const updateImage = (e:any) => {
        let file = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
            console.log(reader.result)
            changeImage(reader.result)
        }
    }

    const submitUser = async (e:SyntheticEvent)=>{
        e.preventDefault()
        if(password !== confirmPassword){
           toast.error('Passwords Do Not Match')
        }
        else{
            let newUser:User = {
                username,
                password,
                firstName,
                lastName,
                email,
                userId:0,
                role: {
                    roleId:NaN,
                    role:""
                },
                image
            }
    
            let res = await userSaveUser(newUser) 
        }
    }

        

    return(
        <div>
            <form onSubmit={submitUser}>
                <TextField id="standard-basic" label="Username" value={username} onChange={updateUsername}/>
                <TextField id="standard-basic" type="password" label="Password" value={password} onChange={updatePassword}/>
                <TextField id="standard-basic" type="password" label="Confirm Password" value={confirmPassword} onChange={updateConfirmPassword}/>
                <TextField id="standard-basic" label="First Name" value={firstName} onChange={updateFirstName}/>
                <TextField id="standard-basic" label="Last Name" value={lastName} onChange={updateLastName}/>
                <TextField id="standard-basic" type="email" label="Email" value={email} onChange={updateEmail}/>
                <label htmlFor='file'>Profile Picture</label>
                <input type='file' name='file' accept='image/*' onChange={updateImage}/>
                <img src={image}/>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    )
}