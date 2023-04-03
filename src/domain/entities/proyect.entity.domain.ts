import { IProjectDomainModel } from "../interfaces/proyecto.interface.domain";

export class ProyectDomainEntity implements IProjectDomainModel{
    name: string;
    dataExpiration: string;
    progress: string;
    priority: string;
    
}