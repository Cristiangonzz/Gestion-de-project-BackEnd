import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TaskSchema } from '../schema/task.shema.infrastructura.data-base';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';
import { TaskRepository } from '../repositories/task.intrastructura.repositoy.data-base';

@Injectable()
export class TaskMongoService
  implements ITaskDomainService<TaskSchema>
{
 
  constructor(private readonly taskRepository: TaskRepository) {}
  
  register(entity: TaskSchema): Observable<TaskSchema> {
    return this.taskRepository.register(entity);
  }
  update(id: string, persona: TaskSchema): Observable<TaskSchema> {
    return this.taskRepository.update(id, persona);
  }
  delete(id: string): Observable<boolean> {
    return this.taskRepository.delete(id);
  }
  findAll(): Observable<TaskSchema[]> {
    throw new Error('Method not implemented.');
  }
  findOneBy(id: string): Observable<TaskSchema> {
      return this.taskRepository.findOneBy(id);
  }
}
