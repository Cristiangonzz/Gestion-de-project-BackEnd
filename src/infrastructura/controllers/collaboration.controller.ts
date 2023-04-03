import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CollaborationService } from '../services/collaboration.service';
import { CreateCollaborationDto } from '../dto/create/create-collaboration.dto';
import { CollaborationDomainEntity } from 'src/domain/entities/collaboration.entity.domain';
import { CreateCollaborationUseCase } from 'src/application/use-case/create/create-collaboration-.use-case';

@ApiTags('Collaboration')
@Controller('Collaboration')
export class CollaborationController {
    constructor(
        private readonly collaborationService: CollaborationService ) {}

    @ApiOperation ({summary: "Crear  Collaboration"})
    @Post('/crear')
     crearCollaboration(@Body() Collaboration: CreateCollaborationDto):Observable<CollaborationDomainEntity> {
        const caso = new CreateCollaborationUseCase(this.collaborationService);
        return caso.execute(Collaboration).pipe(
        catchError((error : Error) => {
            throw new Error(`not register Collaboration ${error}`);
        }));
    }
}

 // @ApiOperation ({summary: "Buscar  Team"})
    //  @Get('buscar')
    //  buscarTeam(@Body() id: BuscarMail ):Observable<TeamDomainEntity>{
    //     const caso = new BuscarTeamUseCase(this.TeamService);
        
    //     return caso.execute(id.mail).pipe(tap((data: TeamDomainEntity) =>{
    //         this.TeamBuscadaPublisher.publish(data);
    //     }),
    //     catchError((error) => {
    //         // Manejo de errores
    //         console.error('Se produjo un error al buscar la Team', error);
    //         throw new Error('No se pudo buscar la Team');
    //       }));
    //  }

    // @ApiOperation ({summary: "Editar  Team"})
    // @Put('editar/:id')
    //    editarTeam(@Param('id') id : string,@Body() TeamEditada: RegistrarTeamDto ):Observable<TeamSchema>{  
    //         const caso = new EditarTeamoUseCase(this.TeamService);
    //         return caso.execute(id,TeamEditada).pipe(tap((data: TeamDomainEntity) =>{
    //            this.TeamEditadaPublisher.publish(data);
    //        }),
    //        catchError((error) => {
    //            // Manejo de errores
    //            console.error('Se produjo un error al editar la Team', error);
    //            throw new Error('No se pudo editar la Team');
    //          }));
    //    }

    // @ApiOperation ({summary: "Eliminar  Team"})
    // @Delete('eliminar/:id')
    //     eliminarTeam(@Param('id') id: string ):Observable<boolean>{

    //         const caso = new EliminarTeamoUseCase(this.TeamService)
    //         return caso.execute(id)
    //             .pipe(
    //                 tap((data: boolean) =>{
    //                 this.TeamEliminadaPublisher.publish(data);
    //         }),
    //         catchError((error) => {
    //             // Manejo de errores
    //             console.error('Se produjo un error al eliminar la Team', error);
    //             throw new Error('No se pudo eliminar la Team');
    //           }));
    //     }
    
    // @ApiOperation ({summary: "Iniciar Sesion Team"})
    // @Post(`signIn`) 
    
    // signIn(@Body() user: LogearseDto): Observable<string>{
    //     const caso = new LogearTeamoUseCase(this.TeamService);
    //     return caso.execute(user);
    // }
