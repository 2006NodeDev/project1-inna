import React, { FunctionComponent } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, RouteComponentProps} from 'react-router-dom';
import { User } from '../../models/User';

interface NavProps extends RouteComponentProps{
  user:User | null
};

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'black'
    },
  }));
  

export const NavBarComponent:FunctionComponent<any> = (props)=>{
    const classes = useStyles();

    let button = []
    console.log(props.user)
    if(props.user != null){
      button.push(<Button color="inherit"><Link to='/logout'>Logout</Link></Button>)
    }

    return(
        <nav>
        <AppBar position='static' style={{ background: '#b39ddb' }}>
            <Toolbar>
          <Typography variant="h6" className={classes.title}>
            innaConnection
          </Typography>
          {button}
        </Toolbar>
        </AppBar>
        </nav>
    )
}