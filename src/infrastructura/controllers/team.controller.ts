import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamService } from '../services/team.service';
import { TeamDomainEntity, TeamDomainEntityMongo } from '../../domain/entities/team.entity.domain';
import { RegisterTeamDto } from '../dto/create/register-team.dto';
import { AgregateMemberOfTeamDto } from '../dto/create/agregate-member-of-team.dto';
import { MemberService } from '../services/member.service';
import { TaskService } from '../services/task.service';
import { AgregateTaskOfTeamDto } from '../dto/create/agregate-task-of-team.dto';
import { CollaborationService } from '../services/collaboration.service';
import { AgregateCollaborationOfTeamDto } from '../dto/create/agregate-collaboration-of-team.dto';
import { TeamDelegate } from '../../application/delegates/team.delegate';
import { ProjectService } from '../services/project.service';

@ApiTags('team')
@Controller('team')
export class TeamController {
    private readonly useCase: TeamDelegate;

    constructor(
        private readonly teamService: TeamService,
        private readonly memberService: MemberService,
        private readonly taskService: TaskService,
        private readonly collaborationService: CollaborationService,
        private readonly projectService: ProjectService,
         ) {
            this.useCase = new TeamDelegate(this.teamService,this.collaborationService,this.memberService,this.taskService,this.projectService);
         }


    @ApiOperation ({summary: "Create  Team"})
    @Post('/create')
    crearTeam(@Body() Team: RegisterTeamDto):Observable<TeamDomainEntity> {
        this.useCase.toCreateTeam();
        return this.useCase.execute(Team);
    }

    
    @ApiOperation ({summary: "Update  Team"})
    @Put('update/:id')
    updateTeam(@Param('id') id : string,@Body() newTeam: RegisterTeamDto ):Observable<TeamDomainEntity>{  
        this.useCase.toUpdateTeam();
        return this.useCase.execute(id,newTeam);
    }
    
    @ApiOperation ({summary: "get  Team"})
    @Get('get/:id')
    GetTeam(@Param('id') id: string ):Observable<TeamDomainEntity>{
        this.useCase.toFindTeams();
        return this.useCase.execute(id);
     }
    
     
    @ApiOperation ({summary: "Delete  Team"})
    @Delete('delete/:id')
    deleteTeam(@Param('id') id: string ):Observable<boolean>{
        this.useCase.toDeleteTeam();
        return this.useCase.execute(id);
    }
            
            
    @ApiOperation ({summary: "agregate member of  Team"})
    @Put('agregate-member')
    agregateMemberOfTeam(@Body() newTeam: AgregateMemberOfTeamDto ):Observable<TeamDomainEntity>{  
        this.useCase.toAgregateMemberOfTeam();
        return this.useCase.execute(newTeam);
    }
        
    @ApiOperation ({summary: "agregate task of  Team"})
    @Put('agregate-task')
    agregateTaskOfTeam(@Body() newTeam: AgregateTaskOfTeamDto ):Observable<TeamDomainEntity>{  
        this.useCase.toAgregateTaskOfTeam();
        return this.useCase.execute(newTeam);
        }

    @ApiOperation ({summary: "agregate collaboration of  Team"})
    @Put('agregate-collaboration')
    agregateCollaborationOfTeam(@Body() newTeam: AgregateCollaborationOfTeamDto ):Observable<TeamDomainEntity>{  
        this.useCase.toAgregateCollaborationOfTeam();
        return this.useCase.execute(newTeam);
    }
    @ApiOperation ({summary: "find All Team"})
    @Get('findAll/')
    findAllTeam():Observable<TeamDomainEntityMongo[]>{
        this.useCase.toFindAllTeams();
        return this.useCase.execute();
    }
}
    
  