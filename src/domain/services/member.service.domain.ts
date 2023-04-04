import { Observable } from "rxjs";

import { MemberDomainEntity } from "../entities/member.entity.domain";

export interface IMemberDomainService<T extends MemberDomainEntity = MemberDomainEntity> {
    
    register(entity: T): Observable<T>;
    findOneBy(id: string): Observable<T>
    update(id :string ,persona: T): Observable<T>;
    delete(id: string): Observable<boolean>;
    findAll(): Observable<T[]>;
    findOneByEmail(email: string): Observable<T>;
}