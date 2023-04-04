import { Observable } from 'rxjs';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { IUseCase } from 'src/domain/interfaces/use-case.interface.domain';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { ITeamDomainService } from 'src/domain/services/team.service.domain';
import { DeleteTeamUseCase } from '../use-case/delete/delete-team-.use-case';
import { GetTeamUseCase } from '../use-case/get/get-team-.use-case';
import { UpdateTeamUseCase } from '../use-case/update/update-team-.use-case';
import { CreateTeamUseCase } from '../use-case/create/create-team-.use-case';
import { CollaborationDomainEntity } from 'src/domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from 'src/domain/services/collaboration.service.domain';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';
import { AgregateTaskOfTeamUseCase } from '../use-case/create/agregate-task-team.use-case';
import { AgregateCollaborationOfTeamUseCase } from '../use-case/create/agregate-collaboration-team.use-case';
import { AgregateMemberOfTeamUseCase } from '../use-case/create/agregate-member-team.use-case';

export class TeamDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly teamService: ITeamDomainService<TeamDomainEntity>,
    private readonly collaborationService: ICollaborationDomainService<CollaborationDomainEntity>,
    private readonly memberService: IMemberDomainService<MemberDomainEntity>,
    private readonly taskService: ITaskDomainService<TaskDomainEntity>,
    ) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateTeam(): void {
    this.delegate = new CreateTeamUseCase(this.teamService);
  }

  toDeleteTeam(): void {
    this.delegate = new DeleteTeamUseCase(this.teamService);
  }

  toFindTeams(): void {
    this.delegate = new GetTeamUseCase(this.teamService);
  }

  toUpdateTeam(): void {
    this.delegate = new UpdateTeamUseCase(this.teamService);
  }

  toAgregateTaskOfTeam(): void {
    this.delegate = new AgregateTaskOfTeamUseCase(this.teamService, this.taskService);
  }
  toAgregateCollaborationOfTeam():void{
    this.delegate = new AgregateCollaborationOfTeamUseCase(this.teamService, this.collaborationService);
  }
  toAgregateMemberOfTeam():void{
    this.delegate = new AgregateMemberOfTeamUseCase(this.teamService, this.memberService);
  }
}
