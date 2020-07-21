import { User } from "../models/User";
import { getAllUsers, getUserById, saveNewUser, patchUser } from "../daos/SQL/users-dao";
import { saveProfilePicture } from "../daos/Cloud-Storage/user-images";
import { bucketBaseUrl } from "../daos/Cloud-Storage";
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
    let date = Date.now()

    if(newUser.image){
        newUser.image = `${bucketBaseUrl}/users/${newUser.username}/${date}/profile.${contentType}`
    }

    let savedUser = await saveNewUser(newUser)

    await saveProfilePicture(contentType, imageBase64Data, `users/${newUser.username}/${date}/profile.${contentType}`)
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
    let date = Date.now()

    let savedUser = undefined
    if(updateUser.image){
        console.log("in the update image")
        let base64Image = updateUser.image
        let [dataType, imageBase64Data] = base64Image.split(';base64,')
        let contentType = dataType.split('/').pop()

        let userInfo = await getUserById(updateUser.userId)

        console.log(userInfo.userId)
        console.log(userInfo.username)

        updateUser.image = `${bucketBaseUrl}/users/${userInfo.username}/${date}/profile.${contentType}`
        savedUser = await patchUser(updateUser)
        await saveProfilePicture(contentType, imageBase64Data, `users/${userInfo.username}/${date}/profile.${contentType}`)
    }
    else{
        savedUser = await patchUser(updateUser)
    }

    //await saveProfilePicture(contentType, imageBase64Data, `users/${updateUser.userId}/profile.${contentType}`)
    //expressEventEmitter.emit(customExpressEvents.NEW_USER, updateUser)
    return savedUser
} catch(e){
    console.log(e)
    throw e
}

}