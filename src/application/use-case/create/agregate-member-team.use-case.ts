import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';
import { TeamDomainEntity } from '../../../domain/entities/team.entity.domain';
import { IMemberDomainService } from '../../../domain/services/member.service.domain';
import { ITeamDomainService } from '../../../domain/services/team.service.domain';
import { AgregateMemberOfTeamDto } from '../../../infrastructura/dto/create/agregate-member-of-team.dto';
import { GetTeamUseCase } from '../get/get-team-.use-case';
import { GetMemberUseCase } from '../get/get-member.use-case';
import { error } from 'console';



export class AgregateMemberOfTeamUseCase {  
  
   
    constructor(
        private readonly teamService: ITeamDomainService<TeamDomainEntity>,
        private readonly memberService: IMemberDomainService<MemberDomainEntity>,
        ) { }

        execute(data: AgregateMemberOfTeamDto): Observable<TeamDomainEntity> {
            console.log(data);
            let teamOld:TeamDomainEntity = {
                name: "",
                member: [""],
                task: [""],
                project: "",
                collaboration: [""],
            }

            const caseMember = new GetMemberUseCase(this.memberService);
            caseMember.execute(data.member);

            const caseTeam =  new GetTeamUseCase(this.teamService);
            caseTeam.execute(data.team)
            return caseTeam.execute(data.team).pipe(
                map((value: TeamDomainEntity) => {
                    value.member.forEach(element => {
                        if(element == data.member) throw error("already registered member ");
                    });
                  teamOld.member = value.member;
                  teamOld.name = value.name;
                  teamOld.project = value.project;
                  teamOld.task = value.task;
                  teamOld.collaboration = value.collaboration;
                  teamOld.member.push(data.member);
                  return teamOld;
                }),
                switchMap((team: TeamDomainEntity) => {
                  return this.teamService.update(data.team, team);
                })
              );
    }
}

