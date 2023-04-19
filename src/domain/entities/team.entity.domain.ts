import { ITeamDomainModel } from "../interfaces/team.interface.domain";

export class TeamDomainEntity implements ITeamDomainModel {
    name: string;
    member: string[];
    task: string[];
    project: string;
    collaboration: string[];
  
}


export class TeamDomainEntityMongo implements ITeamDomainModel {
    _id: string;
    name: string;
    member: string[];
    task: string[];
    project: string;
    collaboration: string[];
  
}