import { userClient } from "."

export const getUserById = async (userId:number) =>{

    try{
        let response = await userClient.get(`/users/${userId}`)
        return (await response).data
    }
    catch(e){
        console.log(e)
    }
}