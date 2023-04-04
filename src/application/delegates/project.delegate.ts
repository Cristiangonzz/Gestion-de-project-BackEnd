import { Observable } from 'rxjs';
import { ProyectDomainEntity } from 'src/domain/entities/proyect.entity.domain';
import { IUseCase } from 'src/domain/interfaces/use-case.interface.domain';
import { IProyectDomainService } from 'src/domain/services/proyect.service.domain';
import { CreateProyectUseCase } from '../use-case/create/create-proyect-.use-case';
import { DeleteProyectUseCase } from '../use-case/delete/delete-proyect-.use-case';
import { GetProyectUseCase } from '../use-case/get/get-proyect-.use-case';
import { UpdateProyectUseCase } from '../use-case/update/update-proyect-.use-case';

export class ProjectDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly projectService: IProyectDomainService<ProyectDomainEntity>) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateProject(): void {
    this.delegate = new CreateProyectUseCase(this.projectService);
  }

  toDeleteProject(): void {
    this.delegate = new DeleteProyectUseCase(this.projectService);
  }

  toFindProjects(): void {
    this.delegate = new GetProyectUseCase(this.projectService);
  }

  toUpdateProject(): void {
    this.delegate = new UpdateProyectUseCase(this.projectService);
  }
}
