import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProyectService } from '../services/proyect.service';
import { CreateProyectUseCase } from 'src/application/use-case/create/create-proyect-.use-case';
import { CreateProyectDto } from '../dto/create/create-proyect.dto';
import { ProyectDomainEntity } from 'src/domain/entities/proyect.entity.domain';

@ApiTags('Proyect')
@Controller('Proyect')
export class ProyectController {
    constructor(
        private readonly proyectService: ProyectService ) {}

    @ApiOperation ({summary: "Crear  Proyect"})
    @Post('/crear')
     crearProyect(@Body() Proyect: CreateProyectDto):Observable<ProyectDomainEntity> {
        const caso = new CreateProyectUseCase(this.proyectService);
        return caso.execute(Proyect).pipe(
        catchError((error : Error) => {
            throw new Error(`not register Proyect ${error}`);
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
