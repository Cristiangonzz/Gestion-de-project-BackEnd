import { Observable, catchError, map } from 'rxjs';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { ITeamDomainService } from 'src/domain/services/team.service.domain';
import { RegisterTeamDto } from 'src/infrastructura/dto/create/register-team.dto';



export class CreateTeamUseCase {  
  
   
    constructor(private readonly teamService: ITeamDomainService<TeamDomainEntity>) { }

        execute(data: RegisterTeamDto): Observable<TeamDomainEntity> {
            
            this.teamService.findOneBy(data.proyect)
            .pipe(
                map(() => true),
                catchError((error:Error) => {
                    throw new Error(`not get proyect in CreateTeamUseCase ${error}`);
                }) 
            )

            const newTeam = new TeamDomainEntity();
            newTeam.name = data.name;
            newTeam.member = [""];
            newTeam.proyect = data.proyect;
            newTeam.task = [""];
            
            return this.teamService.register(newTeam);
    }
}

         