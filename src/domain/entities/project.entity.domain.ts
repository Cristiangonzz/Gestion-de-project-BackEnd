import { IProjectDomainModel } from "../interfaces/project.interface.domain";

export class ProjectDomainEntity implements IProjectDomainModel{
    name: string;
    dataExpiration: string;
    progress: string;
    priority: string;
    
}

export class ProjectDomainEntityMongo implements IProjectDomainModel{
    _id: string;
    name: string;
    dataExpiration: string;
    progress: string;
    priority: string;
    
}