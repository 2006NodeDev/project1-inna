import { ReimbursementDTO } from "../dtos/reimbursement-dto";
import { Reimbursement } from "../models/Reimbursement";

export function ReimbursementDTOToReimbursementConvertor(rdto:ReimbursementDTO):Reimbursement{
    return {
        reimbursementId:rdto.reimbursement_id,
        author: rdto.author, 
        amount: rdto.amount,  
        dateSubmitted: +rdto.date_submitted, 
        dateResolved: +rdto.date_resolved, 
        description: rdto.description,
        resolver: rdto.resolver,
        status: rdto.status,
        type: rdto.type 
    }
}