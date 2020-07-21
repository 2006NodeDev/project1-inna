import { userClient } from "."


export const userLogout = async () => {
    try{
        let response = await userClient.delete('/logout')
        console.log(response)
        return response.data
    } catch(e){
        console.log(e)
    }
}