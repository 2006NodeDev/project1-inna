import { User } from "../models/User";
import { getAllUsers, getUserById, saveNewUser } from "../daos/sql/users-dao";


//calls the dao, easier to expand a function that already exists instead of inserting a new function
export async function getAllUsersService():Promise<User[]>{
    return await getAllUsers()
}

export async function getUserByIDService(id:number):Promise<User>{
    return await getUserById(id)
}

export async function saveNewUserService(newUser:User):Promise<User>{
    try{
    let base64Image = newUser.image

    if(newUser.image){
        newUser.image = 'The Path in the image bucket'
    }

    let savedUser = await saveNewUser(newUser)

    saveProfilePicture(base64Image)
    return savedUser
} catch(e){
    console.log(e)
    throw e
}

}