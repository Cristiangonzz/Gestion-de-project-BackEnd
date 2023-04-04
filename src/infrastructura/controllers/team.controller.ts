import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamService } from '../services/team.service';
import { CreateTeamUseCase } from 'src/application/use-case/create/create-team-.use-case';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { RegisterTeamDto } from '../dto/create/register-team.dto';
import { UpdateTeamUseCase } from 'src/application/use-case/update/update-team-.use-case';
import { GetTeamUseCase } from 'src/application/use-case/get/get-team-.use-case';
import { DeleteTeamUseCase } from 'src/application/use-case/delete/delete-team-.use-case';

@ApiTags('team')
@Controller('team')
export class TeamController {
    constructor(
        private readonly teamService: TeamService ) {}

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
    editarTeam(@Param('id') id : string,@Body() newTeam: RegisterTeamDto ):Observable<TeamDomainEntity>{  
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
            
        }
    // @ApiOperation ({summary: "Iniciar Sesion Team"})
    // @Post(`signIn`) 
    
    // signIn(@Body() user: LogearseDto): Observable<string>{
    //     const caso = new LogearTeamoUseCase(this.TeamService);
    //     return caso.execute(user);
    // }
