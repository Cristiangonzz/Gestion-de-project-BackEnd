import { Observable } from 'rxjs';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { TaskDomainEntity } from '../../../domain/entities/task.entity.domain';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';
import { ITaskDomainService } from '../../../domain/services/task.service.domain';
import { CreateCollaborationDto } from '../../../infrastructura/dto/create/create-collaboration.dto';
import { CreateTaskDto } from '../../../infrastructura/dto/create/create-task.dto';



export class GetTaskUseCase {  
  
   
    constructor(private readonly taskService: ITaskDomainService<TaskDomainEntity>) { }

        execute(data: string): Observable<TaskDomainEntity> {
            return this.taskService.findOneBy(data);
    }
}

         