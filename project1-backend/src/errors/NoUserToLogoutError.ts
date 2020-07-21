import { HttpError } from './HttpError'

export class NoUserToLogoutError extends HttpError{
    constructor(){
        super(400, "No User is logged in")
    }
}