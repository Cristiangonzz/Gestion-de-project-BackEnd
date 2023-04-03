import { Observable } from "rxjs";
import { TeamDomainEntity } from "../entities/team.entity.domain";




export interface ITeamDomainService<T extends TeamDomainEntity = TeamDomainEntity> {
    
    register(entity: T): Observable<T>;
    findOneBy(id: string): Observable<T>
    update(id :string ,persona: T): Observable<T>;
    delete(id: string): Observable<boolean>;
    findAll(): Observable<T[]>;
}