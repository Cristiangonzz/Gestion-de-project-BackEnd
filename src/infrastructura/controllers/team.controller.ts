import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamService } from '../services/team.service';
import { CreateTeamUseCase } from '../../application/use-case/create/create-team-.use-case';
import { TeamDomainEntity } from '../../domain/entities/team.entity.domain';
import { RegisterTeamDto } from '../dto/create/register-team.dto';
import { UpdateTeamUseCase } from '../../application/use-case/update/update-team-.use-case';
import { GetTeamUseCase } from '../../application/use-case/get/get-team-.use-case';
import { DeleteTeamUseCase } from '../../application/use-case/delete/delete-team-.use-case';
import { AgregateMemberOfTeamDto } from '../dto/create/agregate-member-of-team.dto';
import { AgregateMemberOfTeamUseCase } from '../../application/use-case/create/agregate-member-team.use-case';
import { MemberService } from '../services/member.service';
import { TaskService } from '../services/task.service';
import { AgregateTaskOfTeamDto } from '../dto/create/agregate-task-of-team.dto';
import { AgregateTaskOfTeamUseCase } from '../../application/use-case/create/agregate-task-team.use-case';
import { CollaborationService } from '../services/collaboration.service';
import { AgregateCollaborationOfTeamUseCase } from '../../application/use-case/create/agregate-collaboration-team.use-case';
import { AgregateCollaborationOfTeamDto } from '../dto/create/agregate-collaboration-of-team.dto';

@ApiTags('team')
@Controller('team')
export class TeamController {
    constructor(
        private readonly teamService: TeamService,
        private readonly memberService: MemberService,
        private readonly taskService: TaskService,
        private readonly collaborationService: CollaborationService,
         ) {}


    @ApiOperation ({summary: "Crear  Team"})
    @Post('/create')
    crearTeam(@Body() Team: RegisterTeamDto):Observable<TeamDomainEntity> {
        const caso = new CreateTeamUseCase(this.teamService);
        return caso.execute(Team).pipe(
        catchError((error : Error) => {
            throw new Error(`not register Team ${error}`);
          }));
    }

    
    @ApiOperation ({summary: "Update  Team"})
    @Put('update/:id')
    updateTeam(@Param('id') id : string,@Body() newTeam: RegisterTeamDto ):Observable<TeamDomainEntity>{  
        const caso = new UpdateTeamUseCase(this.teamService);
        return caso.execute(id,newTeam)
        .pipe(
            catchError((error) => {
                console.error('Error in Update Team', error);
                throw new Error('not Team Update');
                }));
    }
    
    @ApiOperation ({summary: "get  Team"})
    @Get('get/:id')
    buscarTeam(@Param('id') id: string ):Observable<TeamDomainEntity>{
        const caso = new GetTeamUseCase(this.teamService);
        
        return caso.execute(id)
            .pipe(
                catchError((error) => {
    
                console.error('Error in Get Team', error);
                throw new Error('not Team Get');
          }));
     }
    
     
    @ApiOperation ({summary: "Delete  Team"})
    @Delete('delete/:id')
    deleteTeam(@Param('id') id: string ):Observable<boolean>{

        const caso = new DeleteTeamUseCase(this.teamService)
        return caso.execute(id)
            .pipe(
            catchError((error) => {
            console.error('Error in delete Team', error);
            throw new Error('not Team delete');
            }));
        }
            
            
    @ApiOperation ({summary: "agregate member of  Team"})
    @Put('agregate-member')
    agregateMemberOfTeam(@Body() newTeam: AgregateMemberOfTeamDto ):Observable<TeamDomainEntity>{  
        const caso = new AgregateMemberOfTeamUseCase(this.teamService,this.memberService);
        return caso.execute(newTeam)
        .pipe(
            catchError((error) => {
                console.error('Error in agregate member of Team', error);
                throw new Error('not agregate member of Team ');
                }));
        }
        
        @ApiOperation ({summary: "agregate task of  Team"})
        @Put('agregate-task')
        agregateTaskOfTeam(@Body() newTeam: AgregateTaskOfTeamDto ):Observable<TeamDomainEntity>{  
            const caso = new AgregateTaskOfTeamUseCase(this.teamService,this.taskService);
            return caso.execute(newTeam)
            .pipe(
                catchError((error) => {
                    console.error('Error in agregate task of Team', error);
                    throw new Error('not agregate task of Team ');
                }));
            }

        @ApiOperation ({summary: "agregate collaboration of  Team"})
        @Put('agregate-collaboration')
        agregateCollaborationOfTeam(@Body() newTeam: AgregateCollaborationOfTeamDto ):Observable<TeamDomainEntity>{  
            const caso = new AgregateCollaborationOfTeamUseCase(this.teamService,this.collaborationService);
            return caso.execute(newTeam)
            .pipe(
                catchError((error) => {
                    console.error('Error in agregate collaboration of Team', error);
                    throw new Error('not agregate collaboration of Team ');
                }));
            }
        }
    
  