import { Observable } from 'rxjs';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { ITeamDomainService } from 'src/domain/services/team.service.domain';
import { RegisterTeamDto } from 'src/infrastructura/dto/create/register-team.dto';



export class UpdateTeamUseCase {  
  
   
    constructor(private readonly teamService: ITeamDomainService<TeamDomainEntity>) { }

        execute(id:string, data: RegisterTeamDto): Observable<TeamDomainEntity> {

            const newTeam = new TeamDomainEntity();
            newTeam.name = data.name;
            newTeam.member = data.member;
            newTeam.proyect = data.proyect;
            newTeam.task = data.task;
            
            return this.teamService.update(id,newTeam);
    }
}

         