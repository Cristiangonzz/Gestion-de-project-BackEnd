import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CollaborationService } from '../services/collaboration.service';
import { CreateCollaborationDto } from '../dto/create/create-collaboration.dto';
import { CollaborationDomainEntity } from 'src/domain/entities/collaboration.entity.domain';
import { CreateCollaborationUseCase } from 'src/application/use-case/create/create-collaboration-.use-case';
import { UpdateCollaborationUseCase } from 'src/application/use-case/update/update-collaboration-.use-case';
import { GetCollaborationUseCase } from 'src/application/use-case/get/get-collaboration-.use-case';
import { GetEntityDtp } from '../dto/get/get.dto';

@ApiTags('Collaboration')
@Controller('Collaboration')
export class CollaborationController {
    constructor(
        private readonly collaborationService: CollaborationService ) {}

    @ApiOperation ({summary: "Crear  Collaboration"})
    @Post('/create')
     crearCollaboration(@Body() Collaboration: CreateCollaborationDto):Observable<CollaborationDomainEntity> {
        const caso = new CreateCollaborationUseCase(this.collaborationService);
        return caso.execute(Collaboration).pipe(
        catchError((error : Error) => {
            throw new Error(`not register Collaboration ${error}`);
        }));
    }


        @ApiOperation ({summary: "update  collaboration"})
    @Put('update/:id')
       updateTeam(@Param('id') id : string,@Body() newCollaboration: CreateCollaborationDto ):Observable<CollaborationDomainEntity>{  
            const caso = new UpdateCollaborationUseCase(this.collaborationService);
            return caso.execute(id,newCollaboration)
            .pipe(
                catchError((error) => {
                    console.error('Error in Update Collaboration', error);
                    throw new Error('Not Update Collaboration');
                }));
       }


  @ApiOperation ({summary: "Get Collaboration"})
      @Get('get/:id')
      getCollaboration(@Param('id') id: string ):Observable<CollaborationDomainEntity>{
         const caso = new GetCollaborationUseCase(this.collaborationService);
        
         return caso.execute(id).pipe(
         catchError((error) => {
        
             console.error('Se produjo un error al buscar la Team', error);
             throw new Error('No se pudo buscar la Team');
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
