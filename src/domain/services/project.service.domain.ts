import { Observable } from "rxjs";
import { ProjectDomainEntity } from "../entities/project.entity.domain";


export interface IProjectDomainService<T extends ProjectDomainEntity = ProjectDomainEntity> {
    
    register(entity: T): Observable<T>;
    findOneBy(id: string): Observable<T>
    update(id :string ,persona: T): Observable<T>;
    delete(id: string): Observable<boolean>;
    findAll(): Observable<T[]>;
}