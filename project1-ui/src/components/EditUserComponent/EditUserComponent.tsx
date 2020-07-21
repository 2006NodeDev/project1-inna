import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField, Grid, Box } from '@material-ui/core'
import { User } from '../../models/User'
import { userUpdateUser } from '../../remote/users-api/user-update-user'
import { RouteComponentProps } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


//export const EditUserComponent:FunctionComponent<any> = (props) => {
interface IUserDisplayProps extends RouteComponentProps{
    user:User
}

export const EditUserComponent:FunctionComponent<any> = (props) => {

    console.log(props.user)
    let currUserId = props.user.userId
    

    let [username, changeUsername] = useState('')
    let [password, changePassword] = useState('')
    let [confirmPassword, changeConfirmPassword] = useState('')
    let [firstName, changeFirstName] = useState('')
    let [lastName, changeLastName] = useState('')
    let [email, changeEmail] = useState('')
    let [image, changeImage] = useState(null)

    const updateUsername = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeUsername(e.currentTarget.value)
        }
        else{
            changeUsername(props.user.username)
        }
    }

    const updatePassword = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changePassword(e.currentTarget.value)
        }
        else{
            changePassword(props.user.password)
        }
    }

    const updateConfirmPassword= (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeConfirmPassword(e.currentTarget.value)
        }
        else{
            changeConfirmPassword(props.user.password)
        }
    }

    const updateFirstName = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeFirstName(e.currentTarget.value)
        }
        else{
            changeFirstName(props.user.firstName)
        }
    }

    const updateLastName = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeLastName(e.currentTarget.value)
        }
        else{
            changeLastName(props.user.lastName)
        }
    }

    const updateEmail = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeEmail(e.currentTarget.value)
        }
        else{
            changeEmail(props.user.email)
        }
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

    const updateUser = async (e:SyntheticEvent)=>{
        e.preventDefault()
        if(password !== confirmPassword){
           toast.error('Passwords Do Not Match')
        }
        else{
            let updateUser:User = {
                userId:currUserId,
                username,
                password,
                firstName,
                lastName,
                email,
                role:{
                    roleId:3,
                    role:"user"
                },
                image}

        console.log('update user component')
        console.log(updateUser)
        let res = await userUpdateUser(updateUser) 
        console.log(res)
        props.history.push(`/profile/${res.userId}`)
        }
        
    }

    const goBack = async (e:any) => {
        props.history.push(`/profile/${props.user.userId}`)
    }
        
    return(
        <div>
            <Grid container direction="column" justify="flex-start" alignItems="center">
            <form onSubmit={updateUser}>
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

                <Button variant="contained" type="submit" style={{margin: "6px", background: '#4dd0e1' }}>Submit</Button>
    
                </Box>
                </Grid>
            </form>
            </Grid>
            {/* < ToastContainer/> */}
        </div>
    )
}