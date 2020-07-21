import express, { Request, Response, NextFunction} from 'express'
import { UserIdInputError } from '../errors/UserIdInputError'
import { User } from '../models/User'
// import { patchUser } from '../daos/SQL/users-dao'
//import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { authenticationMiddleware } from '../middleware/authentication-middleware'
import { UnauthorizedEndPointError } from '../errors/UnathorizedEndPointError'
//import { NewUserInputError } from '../errors/NewUserInputError'
import { getAllUsersService, getUserByIDService, patchUserService } from '../services/user-service'

export let userRouter = express.Router()

userRouter.use(authenticationMiddleware);

userRouter.get('/', async (req:Request, res:Response, next:NextFunction) => {
    try{
        let allUsers = await getAllUsersService()
        res.json(allUsers)
    }
    catch(e){
        next(e)
    }
})

userRouter.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
    let {id} = req.params;
    if(isNaN(+id)){
        next(new UserIdInputError)
    }
    else if(req.session.user.role === "user" && req.session.user.userId !== +id){
        next(new UnauthorizedEndPointError)
    }
    else{
        try{
            let user = await getUserByIDService(+id)
            res.json(user)
        } catch (e){
            next(e)
        }
    }
})

userRouter.patch('/', async (req:Request, res:Response, next:NextFunction) => {
    let id = req.body.userId;
    console.log(req.body);
    console.log(id)
    if(isNaN(+id)){
        next(new UserIdInputError)
    }
    else{
        let user: User = {
            userId: id,
            username: req.body.username, 
            password: req.body.password, 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email,
            role: req.body.role,
            image:req.body.image
        }
        console.log("in the router, just set the user")
        console.log(user.userId )
        console.log(user.username)
        try{
            let updatedUser = await patchUserService(user)
            res.json(updatedUser)
        } catch (e){
            next(e)
        } 
    }
})
    
// userRouter.post('/', async (req:Request, res:Response, next:NextFunction) => {
//     let {username,
//         password,
//         firstName,
//         lastName,
//         email, 
//         image} = req.body;
        
//         if(!username|| !password || !firstName || !lastName || !email || !image){
//             next(new NewUserInputError)
//         }
//         else{
//             console.log("in the else")
//             let newUser: User = {
//                 userId: 0,
//                 username,
//                 password,
//                 firstName,
//                 lastName,
//                 email,
//                 role: null, 
//                 image}
//             try{
//                 let savedUser = await saveNewUserService(newUser)
//                 res.status(201).send("Created")
//                 res.json(savedUser)
//             } catch (e){
//                 next(e)
//             }   
//         }
// })
 
