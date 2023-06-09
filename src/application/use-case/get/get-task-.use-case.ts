import { Observable } from 'rxjs';
import { TaskDomainEntity } from '../../../domain/entities/task.entity.domain';
import { ITaskDomainService } from '../../../domain/services/task.service.domain';

export class GetTaskUseCase {  
  
   
    constructor(private readonly taskService: ITaskDomainService<TaskDomainEntity>) { }

        execute(data: string): Observable<TaskDomainEntity> {
            return this.taskService.findOneBy(data);
    }
}

         