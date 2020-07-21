import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import { TextField, Button, Paper, Typography, Grid } from '@material-ui/core'
import { userLogin } from '../../remote/users-api/user-login'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import {RouteComponentProps} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

interface ILoginProps extends RouteComponentProps{
    changeCurrentUser:(newUser:any)=>void
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(10),
        width: theme.spacing(50),
        height: theme.spacing(45),
      },
    },
    paper:{
        // backgroundColor:'#b39ddb',
        width: theme.spacing(42),
        height: theme.spacing(39)
    },
    title:{
        color:'white'
    },
    input:{
        color:'#b39ddb'
    }
}));

export const LoginComponent:FunctionComponent<ILoginProps> = (props) => {
    const classes = useStyles();
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    
 
    const updatePassword = (event:any) => {
        event.preventDefault() //whatever the event was going to do, don't do that
        changePassword(event.target.value) //the element the event got called on
    }

    const updateUsername = (event:any) => {
        event.preventDefault() //whatever the event was going to do, don't do that
        changeUsername(event.target.value) //the element the event got called on
    }

    const loginSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        let res = await userLogin(username, password)
        if(res === undefined){
            toast.error('Incorrect Username or Password')
            props.history.push('/login')
        }
        else{
            props.changeCurrentUser(res)
            changePassword('')
            console.log(res)
            console.log(res.userId)
            props.history.push(`/profile/${(res)?res.userId : '0' }`)
        }
    }
    
    return (
            <Grid container direction="column" justify="center" alignItems="center">
            <Box m={1} pt={8}>
            <Paper className={classes.paper} elevation={10}>
            <form autoComplete="off" onSubmit={loginSubmit}>
                
                    <Box m={1} pt={2}>
                    <Typography variant='h4'>Account Login</Typography>
                    </Box>
                        <Box m={1} pt={2}>
                            <TextField id="outlined-basic" className={classes.input} label="Username" variant="outlined" value={username} onChange={updateUsername}/>
                        </Box>
                        <Box m={1}>
                            <TextField id="outlined-basic2" type="password" label="Password" variant="outlined" value={password} onChange={updatePassword}/>
                        </Box>
                    <Box m={1} pt={1}>
                        <Button type="submit" variant="contained"  style={{ background: '#4dd0e1' }}>Sign In</Button>
                    </Box>
            </form>
            <Box m={1} pt={1}>
            <Typography variant='body1'>
                Don't have an account? <Link to='/new'>Sign Up!</Link>
            </Typography>
            </Box>
            </Paper>
            </Box>
            </Grid>
        
    )
}