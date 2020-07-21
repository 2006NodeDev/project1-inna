import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField, Grid, Box } from '@material-ui/core'
import { toast } from 'react-toastify'
import { User } from '../../models/User'
import { userSaveUser } from '../../remote/users-api/user-save-user'


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
            if(username && password && firstName && lastName && email && image){
                let newUser:User = {
                    username,
                    password,
                    firstName,
                    lastName,
                    email,
                    userId:0,
                    role: {
                        roleId:3,
                        role:"user"
                    },
                    image
                }
                console.log('new user component')
                console.log(newUser)
                let res = await userSaveUser(newUser) 
                console.log(res)
                toast.success('Created')
                props.history.push('/login')
            }
            else{
                toast.error('Please Fill Out All User Information')
            }
            
        }
    }

    const goBack = async (e:any) => {
        props.history.push('/login')
    }     

    return(
        <div>
            <Grid container direction="column" justify="flex-start" alignItems="center">
            <form onSubmit={submitUser}>
                <Box m={1} pt={2}>
                <TextField id="standard-basic" label="Username" value={username} onChange={updateUsername}/>
                <TextField id="standard-basic" type="password" label="Password" value={password} onChange={updatePassword}/>
                <TextField id="standard-basic" type="password" label="Confirm Password" value={confirmPassword} onChange={updateConfirmPassword}/>
                </Box>
                <Box m={1} pt={2}>
                <TextField id="standard-basic" label="First Name" value={firstName} onChange={updateFirstName}/>
                <TextField id="standard-basic" label="Last Name" value={lastName} onChange={updateLastName}/>              
                <TextField id="standard-basic" type="email" label="Email" value={email} onChange={updateEmail}/>
                </Box> 
                <label htmlFor='file'>Profile Picture: </label>
                <input type='file' name='file' accept='image/*' onChange={updateImage}/>
                <img src={image}/>
                <Grid item xs={12}>
                <Box m = {2} pt= {2} pr={2}>
                <Button variant="contained" onClick={goBack} style={{margin: "6px"}}>Cancel</Button>
                <Button variant="contained" type="submit" style={{margin: "6px", background: '#4dd0e1'}}>Submit</Button>
                </Box>
                </Grid>
            </form>
            </Grid>
        </div>
    )
}