import React, { FunctionComponent, SyntheticEvent } from 'react';
import { User } from '../../models/User';
import Paper from '@material-ui/core/Paper'
//import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles';
//import Button from '@material-ui/core/Button';
import { TableContainer, TableCell, Table, TableBody, TableRow, TableHead, Box, Grid, CardMedia, Card } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link, RouteComponentProps } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { getUserById } from '../../remote/users-api/get-user-by-id';

interface IUserDisplayProps{
    user:User | null
}

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    large: {
      width: 230,
      height: 230
    },
    
  });


export const UserDisplayComponent:FunctionComponent<IUserDisplayProps> = (props) =>{
    let classes = useStyles();
      
    return (
          <Grid container>
          <Grid item direction="column" justify="flex-start" alignItems="flex-start">
          {/* <Card className={classes.root}>
          <CardMedia
          className={classes.media}
          image={props.user?.image}
          />
          </Card> */}
          <Box m={4} pt={2}>
          <Avatar src={props.user?.image} className={classes.large}/>
          </Box>
          {/* <img src={props.user?.image}/> */}
          </Grid>
          <Grid item direction="column" justify="flex-end" alignItems="flex-end">
            <Box width="50%">
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
