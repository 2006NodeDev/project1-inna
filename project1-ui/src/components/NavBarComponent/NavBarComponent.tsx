import React, { FunctionComponent } from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';

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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        };

    const handleClose = () => {
        setAnchorEl(null);
    };


    // let menuItems = []
    // menuItems.push(<MenuItem onClick={handleClose}><Link to='/login/'>Login</Link></MenuItem>)
    // if(props.user){
    //   menuItems.push([<MenuItem onClick={handleClose}><Link to='/clicker'>Clicker</Link></MenuItem>,
    //   <MenuItem onClick={handleClose}>My account</MenuItem>,
    //   <MenuItem onClick={handleClose}>Logout</MenuItem>,
    //   <MenuItem onClick={handleClose}><Link to={`/profile/${(props.user)?props.user.userId : '0'}`}>My Profile</Link></MenuItem> ])
    // }

    return(
        <nav>
        <AppBar position='static' style={{ background: '#b39ddb' }}>
            <Toolbar>
          {/* <IconButton onClick ={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Menu id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    {menuItems}       
          </Menu> */}
          <Typography variant="h6" className={classes.title}>
            innaConnection
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
        </AppBar>
        </nav>
    )
}