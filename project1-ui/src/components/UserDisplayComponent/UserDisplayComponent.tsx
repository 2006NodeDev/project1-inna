import React, { FunctionComponent } from 'react';
import { User } from '../../models/User';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { TableCell, Table, TableBody, TableRow, TableHead, Box, Grid, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

interface IUserDisplayProps{
    user:User | null
}

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    large: {
      width: 210,
      height: 210,
    },
  }));

  const defaultProps = {
    borderColor: '#4dd0e1',
    m: 1,
    border: 6,
    style: { width: '15rem', height: '15rem' },
  };


export const UserDisplayComponent:FunctionComponent<IUserDisplayProps> = (props) =>{
    let classes = useStyles();
      
    return (
          <Grid container>
          <Grid item direction="column" justify="flex-start" alignItems="flex-start">
          <Box m={4} pt={2} pr={2}>
          <Box borderRadius="75%" {...defaultProps} >
          {/* <Paper className={classes.paper}> */}
            <Box m={1} pt={1} pr={2} pb={3} pl={1}>
          <Avatar src={props.user?.image} className={classes.large}/>
          </Box>
          {/* </Paper> */}
          </Box>
          </Box>
          </Grid>
          <Grid item direction="column" justify="flex-end" alignItems="flex-end">
            <Box width="50%" >
            <Table className={classes.table} aria-label="simple table">
              <Grid item xs={12} justify='flex-end'>
              <TableHead><h1>{props.user?.firstName} {props.user?.lastName} <Link to={`/profile/edit/${(props.user)?props.user.userId : '0' }`}><EditIcon/></Link></h1></TableHead>
              </Grid>
              <TableBody>
              <TableRow>
                    <TableCell>User Id: </TableCell>
                    <TableCell> {props.user?.userId}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>First Name: </TableCell>
                    <TableCell> {props.user?.firstName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Last Name: </TableCell>
                    <TableCell> {props.user?.lastName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Username: </TableCell>
                    <TableCell> {props.user?.username}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Email: </TableCell>
                    <TableCell> {props.user?.email}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Role: </TableCell>
                    <TableCell> {props.user?.role}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </Box>
            </Grid>
          </Grid>
        );
    }
