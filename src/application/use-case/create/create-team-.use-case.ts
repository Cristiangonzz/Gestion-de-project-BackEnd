import { Observable, catchError, map } from 'rxjs';
import { TeamDomainEntity } from '../../../domain/entities/team.entity.domain';
import { ITeamDomainService } from '../../../domain/services/team.service.domain';
import { RegisterTeamDto } from '../../../infrastructura/dto/create/register-team.dto';
import { IProjectDomainService } from 'src/domain/services/project.service.domain';
import { ProjectDomainEntity } from 'src/domain/entities/project.entity.domain';



export class CreateTeamUseCase {  
  
   
    constructor(private readonly teamService: ITeamDomainService<TeamDomainEntity>,
        private readonly projectService: IProjectDomainService<ProjectDomainEntity>,) { }

        execute(data: RegisterTeamDto): Observable<TeamDomainEntity> {

            this.projectService.findOneBy(data.project)
            .pipe(
                map(() => true),
                catchError((error:Error) => {
                    throw new Error(`not get project in CreateTeamUseCase ${error}`);
                }) 
            )

            const newTeam = new TeamDomainEntity();
            newTeam.name = data.name;
            newTeam.member = [];
            newTeam.project = data.project;
            newTeam.task = [];
            newTeam.collaboration = [];
            
            return this.teamService.register(newTeam);
    }
}

         