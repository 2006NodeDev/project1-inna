import React, { FunctionComponent } from 'react';
import { User } from '../../models/User';
import Paper from '@material-ui/core/Paper'
//import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles';
//import Button from '@material-ui/core/Button';
import { TableContainer, TableCell, Table, TableBody, TableRow, TableHead } from '@material-ui/core';

interface IUserDisplayProps{
    user:User | null
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       '& > *': {
//         margin: theme.spacing(1),
//         width: theme.spacing(16),
//         height: theme.spacing(16),
//       },
//     },
//     paper:{
//         backgroundColor:'grey'
//     }
// }));

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export const UserDisplayComponent:FunctionComponent<IUserDisplayProps> = (props) =>{
    let classes = useStyles();
      
    return (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead><h1>{props.user?.firstName} {props.user?.lastName}</h1></TableHead>
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
          </TableContainer>
        );
    }

// export const UserDisplayComponent:FunctionComponent<IUserDisplayProps> = (props) =>{
//     let classes = useStyles()
//     return(
//         <div className={classes.root}>
//             <Paper className={classes.paper} elevation={4}>
//                 <Typography variant='body1'>
//                     username: {props.user?.username}
//                 </Typography>
//                 <Typography variant='body1'>
//                     email: {props.user?.firstName}
//                 </Typography>
//                 <Typography variant='body1'>
//                     last name: {props.user?.lastName}
//                 </Typography>
//                 <Button variant='contained' color='inherit'>Edit</Button>
//             </Paper>
//         </div>
//     )
// }