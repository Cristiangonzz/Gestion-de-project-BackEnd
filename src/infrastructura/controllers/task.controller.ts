import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskDomainEntity, TaskDomainEntityMongo } from '../../domain/entities/task.entity.domain';
import { CreateTaskDto } from '../dto/create/create-task.dto';
import { TaskService } from '../services/task.service';
import { TaskDelegate } from '../../application/delegates/task.delegate';

@ApiTags('task')
@Controller('task')
export class TaskController {
    private readonly useCase: TaskDelegate;
    constructor(
        private readonly taskService: TaskService ) {
            this.useCase = new TaskDelegate(this.taskService);
        }

    @ApiOperation ({summary: "Crear  Task"})
    @Post('/create')
     createTask(@Body() task: CreateTaskDto):Observable<TaskDomainEntity> {
        this.useCase.toCreateTask();
        return this.useCase.execute(task);
    }


 
    @ApiOperation ({summary: "Update  Task"})
    @Put('update/:id')
    updateTask(@Param('id') id : string,@Body() NewTask: CreateTaskDto ):Observable<TaskDomainEntity>{  
        this.useCase.toUpdateTask();
        return this.useCase.execute(id,NewTask);
    }
    @ApiOperation ({summary: "get  Task"})
     @Get('get/:id')
     getTask(@Param('id') id: string ):Observable<TaskDomainEntity>{
        this.useCase.toFindTasks();
        return this.useCase.execute(id);
     }

     
     @ApiOperation ({summary: "Delete Task"})
     @Delete('delete/:id')
         deleteTask(@Param('id') id: string ):Observable<boolean>{
            this.useCase.toDeleteTask();
            return this.useCase.execute(id);
        }
     
    @ApiOperation ({summary: "find All Task"})
    @Get('findAll/')
    findAllTask():Observable<TaskDomainEntityMongo[]>{
        this.useCase.toFindAllTasks();
        return this.useCase.execute();
    }
    }
                    
