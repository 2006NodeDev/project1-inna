import { User } from "../models/User";
import { getAllUsers, getUserById, saveNewUser, patchUser } from "../daos/SQL/users-dao";
// import { getAllUsers, getUserById} from "../daos/SQL/users-dao";
import { saveProfilePicture } from "../daos/Cloud-Storage/user-images";
import { bucketBaseUrl } from "../daos/Cloud-Storage";
//import { saveNewUser } from "../daos/SQL/index.ts"
import { expressEventEmitter, customExpressEvents } from "../event-listeners";


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
    let [dataType, imageBase64Data] = base64Image.split(';base64,')
    let contentType = dataType.split('/').pop()

    if(newUser.image){
        newUser.image = `${bucketBaseUrl}/users/${newUser.username}/profile.${contentType}`
    }

    let savedUser = await saveNewUser(newUser)

    await saveProfilePicture(contentType, imageBase64Data, `users/${newUser.username}/profile.${contentType}`)
    expressEventEmitter.emit(customExpressEvents.NEW_USER, newUser)
    return savedUser
} catch(e){
    console.log(e)
    throw e
}

}

export async function patchUserService(updateUser:User):Promise<User>{
    try{
    console.log('in the user update')
    console.log(updateUser.userId)
    console.log(updateUser.username)
    let base64Image = updateUser.image
    let [dataType, imageBase64Data] = base64Image.split(';base64,')
    let contentType = dataType.split('/').pop()

    if(updateUser.image){
        updateUser.image = `${bucketBaseUrl}/users/${updateUser.userId}/profile.${contentType}`
    }

    let savedUser = await patchUser(updateUser)

    await saveProfilePicture(contentType, imageBase64Data, `users/${updateUser.userId}/profile.${contentType}`)
    //expressEventEmitter.emit(customExpressEvents.NEW_USER, updateUser)
    return savedUser
} catch(e){
    console.log(e)
    throw e
}

}