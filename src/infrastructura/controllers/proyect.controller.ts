import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProyectService } from '../services/proyect.service';
import { CreateProyectUseCase } from '../../application/use-case/create/create-proyect-.use-case';
import { CreateProyectDto } from '../dto/create/create-proyect.dto';
import { ProyectDomainEntity } from '../../domain/entities/proyect.entity.domain';
import { ProjectDelegate } from 'src/application/delegates/project.delegate';

@ApiTags('Proyect')
@Controller('Proyect')
export class ProyectController {
    private readonly useCase : ProjectDelegate;

    constructor(
        private readonly proyectService: ProyectService ) {

            this.useCase = new ProjectDelegate(this.proyectService);
        }

    @ApiOperation ({summary: "create  Proyect"})
    @Post('/create')
     createProyect(@Body() Proyect: CreateProyectDto):Observable<ProyectDomainEntity> {
        this.useCase.toCreateProject();
        return this.useCase.execute(Proyect);
    }

    @ApiOperation ({summary: "update  Team"})
    @Put('update/:id')
        updateTeam(@Param('id') id : string,@Body() newProyect: CreateProyectDto ):Observable<ProyectDomainEntity>{  
            this.useCase.toUpdateProject();
            return this.useCase.execute(id,newProyect);
        }

    @ApiOperation ({summary: "Get Proyect"})
    @Get('get/:id')
    getProject(@Param('id') id: string ):Observable<ProyectDomainEntity>{
        this.useCase.toFindProjects();
        return this.useCase.execute(id);
     }

     
     @ApiOperation ({summary: "Delete Proyect"})
    @Delete('delete/:id')
        deleteProyect(@Param('id') id: string ):Observable<boolean>{
            this.useCase.toDeleteProject();
            return this.useCase.execute(id);
        }
        
    }
  
