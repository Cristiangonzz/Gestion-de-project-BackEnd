import { Observable } from "rxjs";

export interface IMemberRepository<T> {	

    register(entity: T): Observable<T>;
    findOneBy(id: string): Observable<T>
    update(id :string ,persona: T): Observable<T>;
    delete(id: string): Observable<boolean>;
    findAll(): Observable<T[]>;
    findOneByEmail(email: string): Observable<T>;
    
}