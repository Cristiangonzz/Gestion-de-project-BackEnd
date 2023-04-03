import { Observable } from "rxjs";
import { ProyectDomainEntity } from "../entities/proyect.entity.domain";


export interface IProyectDomainService<T extends ProyectDomainEntity = ProyectDomainEntity> {
    
    register(entity: T): Observable<T>;
    findOneBy(id: string): Observable<T>
    update(id :string ,persona: T): Observable<T>;
    delete(id: string): Observable<boolean>;
    findAll(): Observable<T[]>;
}