import { Observable } from 'rxjs';
import { TaskDomainEntity } from '../../../domain/entities/task.entity.domain';
import { ITaskDomainService } from '../../../domain/services/task.service.domain';

export class FindAllTaskUseCase {  
  
   
    constructor(private readonly taskService: ITaskDomainService<TaskDomainEntity>) { }

        execute(): Observable<TaskDomainEntity[]> {
            return this.taskService.findAll();
    }
}
