import { HttpError } from './HttpError'

export class UsernameNotUniqueError extends HttpError{
    constructor(){
        super(400, "Username Must Be Unique.")
    }
}