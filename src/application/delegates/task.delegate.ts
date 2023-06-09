import { Observable } from 'rxjs';
import { IUseCase } from '../../domain/interfaces/use-case.interface.domain';
import { TaskDomainEntity } from '../../domain/entities/task.entity.domain';
import { ITaskDomainService } from '../../domain/services/task.service.domain';
import { DeleteTaskUseCase } from '../use-case/delete/delete-task-.use-case';
import { GetTaskUseCase } from '../use-case/get/get-task-.use-case';
import { UpdateTaskUseCase } from '../use-case/update/update-task-.use-case';
import { CreateTaskUseCase } from '../use-case/create/create-task-.use-case';
import { FindAllTaskUseCase } from '../use-case/findAll/find-all-task.use-case';

export class TaskDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly taskService: ITaskDomainService<TaskDomainEntity>) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateTask(): void {
    this.delegate = new CreateTaskUseCase(this.taskService);
  }

  toDeleteTask(): void {
    this.delegate = new DeleteTaskUseCase(this.taskService);
  }

  toFindTasks(): void {
    this.delegate = new GetTaskUseCase(this.taskService);
  }
  toFindAllTasks(): void {
    this.delegate = new FindAllTaskUseCase(this.taskService);
  }

  toUpdateTask(): void {
    this.delegate = new UpdateTaskUseCase(this.taskService);
  }
}
