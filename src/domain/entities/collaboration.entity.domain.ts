import { ICollaborationDomainModel } from "../interfaces/collaboration.interface.domain";

export class CollaborationDomainEntity implements ICollaborationDomainModel {
    comment: string;
    notification: string;
    progress: string;
    performence: string;
 
}


export class CollaborationDomainEntityMongo implements ICollaborationDomainModel {
    _id: string;
    comment: string;
    notification: string;
    progress: string;
    performence: string;
 
}