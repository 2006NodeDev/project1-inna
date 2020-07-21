import {RouteComponentProps} from 'react-router-dom'
import { FunctionComponent, SyntheticEvent } from 'react'
import { userLogout } from '../../remote/users-api/user-logout'
import { Button, Grid, Box, Paper, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { User } from '../../models/User'

interface ILogoutProps extends RouteComponentProps{
    changeCurrentUser:(user:any)=>void
    user:User | null
};

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

export const LogoutComponent:FunctionComponent<ILogoutProps> = (props) => {
    const classes = useStyles();
    console.log(props)

    const handleLogout = async (e:SyntheticEvent) => {
        e.preventDefault()
        let res = await userLogout()
        props.changeCurrentUser(res)
        props.history.push('/')
    }

    const goBack = async (e:any) => {
        props.history.push(`/profile/${props.user.userId}`)
    }

    return(
        <Grid container direction="column" justify="center" alignItems="center">
            <Box m={1} pt={8}>
            <Paper className={classes.paper} elevation={10}>  
                <Box m={1} pt={2}>
                <Typography variant='h4'>Are you sure you want to logout? </Typography>
                </Box>
                <Box m={2} pt={2}>
                    <Box m={1} pt={2}>
                    <Button variant="contained"  onClick={handleLogout} style={{ background: '#4dd0e1' }}>Logout</Button>
                    </Box>
                    <Box m={1} pt={2}>
                    <Button variant="contained" onClick={goBack} style={{ background: '#eeeeee' }}>Cancel</Button>
                    </Box>
                </Box>
        </Paper>
        </Box>
        </Grid>
    )

}