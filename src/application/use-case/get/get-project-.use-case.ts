import { Observable } from 'rxjs';
import { ProjectDomainEntity } from '../../../domain/entities/project.entity.domain';
import { IProjectDomainService } from '../../../domain/services/project.service.domain';

export class GetProjectUseCase {  
   
    constructor(private readonly projectService: IProjectDomainService<ProjectDomainEntity>) { }

        execute(data: string): Observable<ProjectDomainEntity> {

            return this.projectService.findOneBy(data);
    }
}

         