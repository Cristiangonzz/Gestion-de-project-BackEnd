import { Observable } from 'rxjs';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { ITeamDomainService } from 'src/domain/services/team.service.domain';



export class DeleteTeamUseCase {  
  
   
    constructor(private readonly teamService: ITeamDomainService<TeamDomainEntity>) { }

        execute(data: string): Observable<boolean> {
            return this.teamService.delete(data);
    }
}

         