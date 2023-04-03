import { ITeamDomainModel } from "../interfaces/team.interface.domain";

export class TeamDomainEntity implements ITeamDomainModel {
    name: string;
    member: string[];
    task: string[];
    proyect: string;
  
}