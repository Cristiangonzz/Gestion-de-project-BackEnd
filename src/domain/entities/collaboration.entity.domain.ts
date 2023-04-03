import { ICollaborationDomainModel } from "../interfaces/collaboration.interface.domain";

export class CollaborationDomainEntity implements ICollaborationDomainModel {
    comment: string;
    notification: string;
    progress: string;
    performence: string;
    team: string;
}