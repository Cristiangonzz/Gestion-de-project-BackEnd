import { Observable } from 'rxjs';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { ITeamDomainService } from 'src/domain/services/team.service.domain';
import { RegisterTeamDto } from 'src/infrastructura/dto/create/register-team.dto';



export class GetTeamUseCase {  
  
   
    constructor(private readonly teamService: ITeamDomainService<TeamDomainEntity>) { }

        execute(data: string): Observable<TeamDomainEntity> {
            return this.teamService.findOneBy(data);
    }
}

         