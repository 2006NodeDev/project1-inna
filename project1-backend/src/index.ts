import express, { Request, Response, NextFunction } from 'express'
import { userRouter } from './routers/user-router'
import { loggingMiddleware } from './middleware/logging-middleware'
import { sessionMiddleware } from './middleware/session-middleware'
import { reimbursementRouter } from './routers/reimbursement-router'
import { BadCredentialsError } from './errors/BadCredentialsError'
//import { AuthFailureError } from './errors/AuthFailureError'
//import { authenticationMiddleware } from './middleware/authentication-middleware'
import { getUsernameAndPassword } from './daos/SQL/users-dao'
import { corsFilter } from './middleware/cors-filter'
import { NewUserInputError } from './errors/NewUserInputError'
import { User } from './models/User'
import { saveNewUserService } from './services/user-service'
//import { userTopic } from './messaging/index'
import './event-listeners/new-user'
import { NoUserToLogoutError } from './errors/NoUserToLogoutError'

//console.log(userTopic)
const app = express()

app.use(express.json({limit:'50mb'}))

app.use(loggingMiddleware);
app.use(corsFilter);
app.use(sessionMiddleware);


app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);


app.get('/health', (req:Request,res:Response)=>{
    res.sendStatus(200)
})

app.post('/signUp', async (req:Request, res:Response, next:NextFunction) => {
    let {username,
        password,
        firstName,
        lastName,
        email, 
        image} = req.body;
        
        if(!username|| !password || !firstName || !lastName || !email || !image){
            next(new NewUserInputError)
        }
        else{
            console.log("in the else")
            let newUser: User = {
                userId: 0,
                username,
                password,
                firstName,
                lastName,
                email,
                role: null, 
                image}
            try{
                let savedUser = await saveNewUserService(newUser)
                res.status(201).send("Created")
                res.json(savedUser)
            } catch (e){
                next(e)
            }   
        }
})

app.post('/login', async (req:Request, res:Response, next:NextFunction) =>{
    let username = req.body.username
    let password = req.body.password

    if(!username || !password){
        next(new BadCredentialsError())
    } else {
        try{
            let user = await getUsernameAndPassword(username, password)
            req.session.user = user
            res.json(user)
        }
        catch(e){
            next(e)
        }
    }
})

app.delete('/logout', async (req:Request, res:Response, next:NextFunction) => {
    if (!req.session.user){
        next(new NoUserToLogoutError())
    }
    else {
        try{
            req.session.user = null
            res.json(req.session.user)
        }
        catch(e){
            next(e)
        }
    }
})

//app.use(authenticationMiddleware);

app.use((err, req, res, next) => {
    if(err.statusCode){
        res.status(err.statusCode).send(err.message)
    }
    else{
        console.log(err)
        res.status(500).send("something went wrong")
    }
})

app.listen(2006, ()=>{
    console.log('Server has started');
})