import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/create/create-project.dto';
import { ProjectDomainEntity } from '../../domain/entities/project.entity.domain';
import { ProjectDelegate } from '../../application/delegates/project.delegate';

@ApiTags('project')
@Controller('project')
export class ProjectController {
    private readonly useCase : ProjectDelegate;

    constructor(
        private readonly projectService: ProjectService ) {

            this.useCase = new ProjectDelegate(this.projectService);
        }

    @ApiOperation ({summary: "create  project"})
    @Post('/create')
     createproject(@Body() project: CreateProjectDto):Observable<ProjectDomainEntity> {
        this.useCase.toCreateProject();
        return this.useCase.execute(project);
    }

    @ApiOperation ({summary: "update  Team"})
    @Put('update/:id')
        updateTeam(@Param('id') id : string,@Body() newproject: CreateProjectDto ):Observable<ProjectDomainEntity>{  
            this.useCase.toUpdateProject();
            return this.useCase.execute(id,newproject);
        }

    @ApiOperation ({summary: "Get project"})
    @Get('get/:id')
    getProject(@Param('id') id: string ):Observable<ProjectDomainEntity>{
        this.useCase.toFindProjects();
        return this.useCase.execute(id);
     }

     
     @ApiOperation ({summary: "Delete project"})
    @Delete('delete/:id')
        deleteproject(@Param('id') id: string ):Observable<boolean>{
            this.useCase.toDeleteProject();
            return this.useCase.execute(id);
        }
        
    }
  
