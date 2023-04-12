import { Observable } from 'rxjs';
import { ProjectDomainEntity } from '../../../domain/entities/project.entity.domain';
import { IProjectDomainService } from '../../../domain/services/project.service.domain';
import { CreateProjectDto } from '../../../infrastructura/dto/create/create-project.dto';

export class CreateProjectUseCase {  
   
    constructor(private readonly projectService: IProjectDomainService<ProjectDomainEntity>) { }

        execute(data: CreateProjectDto): Observable<ProjectDomainEntity> {

            const newproject = new ProjectDomainEntity();
            newproject.name = data.name;
            newproject.dataExpiration = data.dataExpiration;
            newproject.priority = data.priority;
            newproject.progress = data.progress;
            
            return this.projectService.register(newproject);
    }
}

         