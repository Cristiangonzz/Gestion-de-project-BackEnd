import { Observable } from 'rxjs';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';
import { CreateTaskDto } from 'src/infrastructura/dto/create/create-task.dto';



export class UpdateTaskUseCase {  
  
   
    constructor(private readonly taskService: ITaskDomainService<TaskDomainEntity>) { }

        execute(id:string,data: CreateTaskDto): Observable<TaskDomainEntity> {

            const newTask = new TaskDomainEntity();
            newTask.name = data.name;
            newTask.dataExpiration = data.dataExpiration;
            newTask.description = data.description;
            newTask.priority = data.priority;
            newTask.progress = data.progress;
            
            return this.taskService.update(id,newTask);
    }
}

         