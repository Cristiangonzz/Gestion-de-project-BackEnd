import { Observable } from 'rxjs';
import { CollaborationDomainEntity } from 'src/domain/entities/collaboration.entity.domain';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
import { ICollaborationDomainService } from 'src/domain/services/collaboration.service.domain';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';
import { CreateCollaborationDto } from 'src/infrastructura/dto/create/create-collaboration.dto';
import { CreateTaskDto } from 'src/infrastructura/dto/create/create-task.dto';



export class GetTaskUseCase {  
  
   
    constructor(private readonly taskService: ITaskDomainService<TaskDomainEntity>) { }

        execute(data: string): Observable<TaskDomainEntity> {
            return this.taskService.findOneBy(data);
    }
}

         