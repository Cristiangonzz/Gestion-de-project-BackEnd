import { Observable } from 'rxjs';
import { ProjectDomainEntity } from '../../domain/entities/project.entity.domain';
import { IUseCase } from '../../domain/interfaces/use-case.interface.domain';
import { IProjectDomainService } from '../../domain/services/project.service.domain';
import { CreateProjectUseCase, DeleteProjectUseCase, GetProjectUseCase, UpdateProjectUseCase } from '../use-case';
import { FindAllProjectUseCase } from '../use-case/findAll/find-all-project.use-case';

export class ProjectDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly projectService: IProjectDomainService<ProjectDomainEntity>) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateProject(): void {
    this.delegate = new CreateProjectUseCase(this.projectService);
  }

  toDeleteProject(): void {
    this.delegate = new DeleteProjectUseCase(this.projectService);
  }

  toFindProjects(): void {
    this.delegate = new GetProjectUseCase(this.projectService);
  }
  toFindAllProjects(): void {
    this.delegate = new FindAllProjectUseCase(this.projectService);
  }

  toUpdateProject(): void {
    this.delegate = new UpdateProjectUseCase(this.projectService);
  }
}
