import { Observable, map, switchMap } from 'rxjs';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { ITeamDomainService } from 'src/domain/services/team.service.domain';
import { GetTeamUseCase } from '../get/get-team-.use-case';
import { error } from 'console';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
import { GetTaskUseCase } from '../get/get-task-.use-case';
import { AgregateTaskOfTeamDto } from 'src/infrastructura/dto/create/agregate-task-of-team.dto';



export class AgregateTaskOfTeamUseCase {  
  
   
    constructor(
        private readonly teamService: ITeamDomainService<TeamDomainEntity>,
        private readonly taskService: ITaskDomainService<TaskDomainEntity>,
        ) { }

        execute(data: AgregateTaskOfTeamDto): Observable<TeamDomainEntity> {
            console.log(data);
            let teamOld:TeamDomainEntity = {
                name: "",
                member: [""],
                task: [""],
                proyect: "",
                collaboration: [""],
            }

            const caseTask = new GetTaskUseCase(this.taskService);
            caseTask.execute(data.task);

            const caseTeam =  new GetTeamUseCase(this.teamService);
            caseTeam.execute(data.team)
            return caseTeam.execute(data.team).pipe(
                map((value: TeamDomainEntity) => {
                    value.task.forEach(element => {
                        if(element == data.task) throw error("already registered task ");
                    });
                  teamOld.member = value.member;
                  teamOld.name = value.name;
                  teamOld.proyect = value.proyect;
                  teamOld.task = value.task;
                  teamOld.collaboration = value.collaboration;
                  teamOld.task.push(data.task);
                  return teamOld;
                }),
                switchMap((team: TeamDomainEntity) => {
                  return this.teamService.update(data.team, team);
                })
              );
    }
}

