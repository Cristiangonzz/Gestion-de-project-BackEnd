import { IProjectDomainModel } from "../interfaces/proyect.interface.domain";

export class ProyectDomainEntity implements IProjectDomainModel{
    name: string;
    dataExpiration: string;
    progress: string;
    priority: string;
    
}