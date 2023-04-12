import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { TeamDomainEntity } from '../../../domain/entities/team.entity.domain';
import { ITeamDomainService } from '../../../domain/services/team.service.domain';
import { GetTeamUseCase } from '../get/get-team-.use-case';
import { error } from 'console';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { AgregateCollaborationOfTeamDto } from '../../../infrastructura/dto/create/agregate-collaboration-of-team.dto';
import { GetCollaborationUseCase } from '../get/get-collaboration-.use-case';



export class AgregateCollaborationOfTeamUseCase {  
  
   
    constructor(
        private readonly teamService: ITeamDomainService<TeamDomainEntity>,
        private readonly collaborationService: ICollaborationDomainService<CollaborationDomainEntity>,
        ) { }

        execute(data: AgregateCollaborationOfTeamDto): Observable<TeamDomainEntity> {
            console.log(data);
            let teamOld:TeamDomainEntity = {
                name: "",
                task: [""],
                member: [""],
                project: "",
                collaboration: [""]
            }

            const caseCollaboration = new GetCollaborationUseCase(this.collaborationService);
            caseCollaboration.execute(data.collaboration);

            const caseTeam =  new GetTeamUseCase(this.teamService);
            caseTeam.execute(data.team)
            return caseTeam.execute(data.team).pipe(
                map((value: TeamDomainEntity) => {
                    value.collaboration.forEach(element => {
                        if(element == data.collaboration) throw error("already registered collaboration ");
                    });
                  teamOld.collaboration = value.collaboration;
                  teamOld.name = value.name;
                  teamOld.project = value.project;
                  teamOld.task = value.task;
                  teamOld.collaboration.push(data.collaboration);
                  return teamOld;
                }),
                switchMap((team: TeamDomainEntity) => {
                  return this.teamService.update(data.team, team);
                })
            );
    }
}

