import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectSchema } from '../schema/project.shema.infrastructura.data-base';
import { ProjectRepository } from '../repositories/project.intrastructura.repositoy.data-base';
import { IProjectDomainService } from '../../../domain/services/project.service.domain';

@Injectable()
export class ProjectMongoService
  implements IProjectDomainService<ProjectSchema>
{
 
  constructor(private readonly projectRepository: ProjectRepository) {}
  
  register(entity: ProjectSchema): Observable<ProjectSchema> {
    return this.projectRepository.register(entity);
  }
  update(id: string, persona: ProjectSchema): Observable<ProjectSchema> {
    return this.projectRepository.update(id, persona);
  }
  delete(id: string): Observable<boolean> {
    return this.projectRepository.delete(id);
  }
  findAll(): Observable<ProjectSchema[]> {
    return this.projectRepository.findAll();
  }
  findOneBy(id: string): Observable<ProjectSchema> {
      return this.projectRepository.findOneBy(id);
  }
}
