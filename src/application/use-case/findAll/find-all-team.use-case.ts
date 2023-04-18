import { Observable } from 'rxjs';
import { TeamDomainEntity } from '../../../domain/entities/team.entity.domain';
import { ITeamDomainService } from '../../../domain/services/team.service.domain';



export class FindAllTeamUseCase {  
   
    constructor(private readonly teamService: ITeamDomainService<TeamDomainEntity>) { }

        execute(): Observable<TeamDomainEntity[]> {
            return this.teamService.findAll();
    }
}

         