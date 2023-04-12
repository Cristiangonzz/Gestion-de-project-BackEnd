import { Observable } from 'rxjs';
import { TeamDomainEntity } from '../../../domain/entities/team.entity.domain';
import { ITeamDomainService } from '../../../domain/services/team.service.domain';
import { RegisterTeamDto } from '../../../infrastructura/dto/create/register-team.dto';



export class UpdateTeamUseCase {  
  
   
    constructor(private readonly teamService: ITeamDomainService<TeamDomainEntity>) { }

        execute(id:string, data: RegisterTeamDto): Observable<TeamDomainEntity> {

            const newTeam = new TeamDomainEntity();
            newTeam.name = data.name;
            newTeam.member = data.member;
            newTeam.project = data.project;
            newTeam.task = data.task;
            newTeam.collaboration = data.collaboration;
            
            return this.teamService.update(id,newTeam);
    }
}

         