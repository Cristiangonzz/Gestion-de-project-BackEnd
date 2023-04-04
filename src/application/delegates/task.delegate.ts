import { Observable } from 'rxjs';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { RegisterMemberUseCase } from '../use-case/create/register-member.use-case';
import { IUseCase } from 'src/domain/interfaces/use-case.interface.domain';
import { DeleteMemberUseCase } from '../use-case/delete/delete-member.use-case';
import { GetMemberUseCase } from '../use-case/get/get-member.use-case';
import { UpdateMemberUseCase } from '../use-case/update/update-member.use-case';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';
import { DeleteTaskUseCase } from '../use-case/delete/delete-task-.use-case';
import { GetTaskUseCase } from '../use-case/get/get-task-.use-case';
import { UpdateTaskUseCase } from '../use-case/update/update-task-.use-case';
import { CreateTaskUseCase } from '../use-case/create/create-task-.use-case';

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

  toUpdateTask(): void {
    this.delegate = new UpdateTaskUseCase(this.taskService);
  }
}
