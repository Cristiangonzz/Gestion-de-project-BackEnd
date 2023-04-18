import { Observable } from 'rxjs';
import { ProjectDomainEntity } from '../../../domain/entities/project.entity.domain';
import { IProjectDomainService } from '../../../domain/services/project.service.domain';

export class FindAllProjectUseCase {  
   
    constructor(private readonly projectService: IProjectDomainService<ProjectDomainEntity>) { }

        execute(): Observable<ProjectDomainEntity[]> {

            return this.projectService.findAll();
    }
}

         