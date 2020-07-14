import { HttpError } from './HttpError'

export class NewUserInputError extends HttpError{
    constructor(){
        super(400, "Missing User Arguments.")
    }
}