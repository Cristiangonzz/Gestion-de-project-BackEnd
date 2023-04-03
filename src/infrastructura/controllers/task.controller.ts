import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
import { CreateTaskDto } from '../dto/create/create-task.dto';
import { TaskService } from '../services/task.service';
import { CreateTaskUseCase } from 'src/application/use-case/create/create-task-.use-case';
import { UpdateTeamUseCase } from 'src/application/use-case/update/update-team-.use-case';
import { UpdateTaskUseCase } from 'src/application/use-case/update/update-task-.use-case';
import { GetTaskUseCase } from 'src/application/use-case/get/get-task-.use-case';

@ApiTags('Task')
@Controller('Task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService ) {}

    @ApiOperation ({summary: "Crear  Task"})
    @Post('/crear')
     crearTask(@Body() task: CreateTaskDto):Observable<TaskDomainEntity> {
        const caso = new CreateTaskUseCase(this.taskService);
        return caso.execute(task).pipe(
        catchError((error : Error) => {
            throw new Error(`not register Task ${error}`);
        }));
    }


 
    @ApiOperation ({summary: "Update  Task"})
    @Put('update/:id')
    editarTeam(@Param('id') id : string,@Body() NewTask: CreateTaskDto ):Observable<TaskDomainEntity>{  
            const caso = new UpdateTaskUseCase(this.taskService);
            return caso.execute(id,NewTask)
            .pipe( 
            catchError((error) => {
            console.error('Error in Update Task', error);
            throw new Error('not Task Update');
            }));
    }
    @ApiOperation ({summary: "get  Task"})
     @Get('get/:id')
     buscarTeam(@Param('id') id: string ):Observable<TaskDomainEntity>{
        const caso = new GetTaskUseCase(this.taskService);
        
        return caso.execute(id)
            .pipe(
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
