import { IProjectDomainModel } from "../interfaces/project.interface.domain";

export class ProjectDomainEntity implements IProjectDomainModel{
    name: string;
    dataExpiration: string;
    progress: string;
    priority: string;
    
}