import { Observable } from "rxjs";
import { CollaborationDomainEntity } from "../entities/collaboration.entity.domain";


export interface ICollaborationDomainService<T extends CollaborationDomainEntity = CollaborationDomainEntity> {
    
    register(entity: T): Observable<T>;
    findOneBy(id: string): Observable<T>
    update(id :string ,persona: T): Observable<T>;
    delete(id: string): Observable<boolean>;
    findAll(): Observable<T[]>;
}