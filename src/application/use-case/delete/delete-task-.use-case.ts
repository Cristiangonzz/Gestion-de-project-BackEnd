import { Observable } from 'rxjs';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';



export class DeleteTaskUseCase {  
  
   
    constructor(private readonly taskService: ITaskDomainService<TaskDomainEntity>) { }

        execute(data: string): Observable<boolean> {
            return this.taskService.delete(data);
    }
}

         