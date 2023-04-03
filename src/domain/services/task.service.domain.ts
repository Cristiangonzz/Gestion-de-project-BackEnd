import { Observable } from "rxjs";
import { TaskDomainEntity } from "../entities/task.entity.domain";



export interface ITaskDomainService<T extends TaskDomainEntity = TaskDomainEntity> {
    
    register(entity: T): Observable<T>;
    findOneBy(id: string): Observable<T>
    update(id :string ,persona: T): Observable<T>;
    delete(id: string): Observable<boolean>;
    findAll(): Observable<T[]>;
}