import { expressEventEmitter, customExpressEvents } from "../event-listeners"
import { User } from "../models/User"
import { userTopic } from "../messaging"

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    setImmediate( async ()=>{
        try{
            let res = await userTopic.publishJSON(newUser)
            console.log(res)
        } catch(e) {
            console.log(e)
        }
    })
})