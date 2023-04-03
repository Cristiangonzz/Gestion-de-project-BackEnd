import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProyectService } from '../services/proyect.service';
import { CreateProyectUseCase } from 'src/application/use-case/create/create-proyect-.use-case';
import { CreateProyectDto } from '../dto/create/create-proyect.dto';
import { ProyectDomainEntity } from 'src/domain/entities/proyect.entity.domain';
import { UpdateProyectUseCase } from 'src/application/use-case/update/update-proyect-.use-case';
import { GetTeamUseCase } from 'src/application/use-case/get/get-team-.use-case';
import { GetProyectUseCase } from 'src/application/use-case/get/get-proyect-.use-case';

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



    @ApiOperation ({summary: "update  Team"})
    @Put('update/:id')
        editarTeam(@Param('id') id : string,@Body() newProyect: CreateProyectDto ):Observable<ProyectDomainEntity>{  
             const caso = new UpdateProyectUseCase(this.proyectService);
             return caso.execute(id,newProyect)
                .pipe(
            catchError((error) => {
                // Manejo de errores
                console.error('error in Project Update', error);
                throw new Error('Not Update Project');
            }));
        }

    @ApiOperation ({summary: "Get Proyect"})
    @Get('get/:id')
    getProject(@Param('id') id: string ):Observable<ProyectDomainEntity>{
        const caso = new GetProyectUseCase(this.proyectService);
        
        return caso.execute(id)
            .pipe(
            catchError((error) => {
            console.error('Se produjo un error al buscar la project', error);
            throw new Error('No se pudo buscar la project');
          }));
     }

    }

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
