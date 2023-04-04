import { Observable } from 'rxjs';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { TaskDomainEntity } from '../../../domain/entities/task.entity.domain';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';
import { ITaskDomainService } from '../../../domain/services/task.service.domain';
import { CreateCollaborationDto } from '../../../infrastructura/dto/create/create-collaboration.dto';
import { CreateTaskDto } from '../../../infrastructura/dto/create/create-task.dto';



export class CreateTaskUseCase {  
  
   
    constructor(private readonly taskService: ITaskDomainService<TaskDomainEntity>) { }

        execute(data: CreateTaskDto): Observable<TaskDomainEntity> {

            const newTask = new TaskDomainEntity();
            newTask.name = data.name;
            newTask.dataExpiration = data.dataExpiration;
            newTask.description = data.description;
            newTask.priority = data.priority;
            newTask.progress = data.progress;
            
            return this.taskService.register(newTask);
    }
}

         