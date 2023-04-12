import { Injectable } from '@nestjs/common';
import { ProjectMongoService } from '../dataBase/services/project.service.mongo';

@Injectable()
export class ProjectService extends ProjectMongoService  {
}
