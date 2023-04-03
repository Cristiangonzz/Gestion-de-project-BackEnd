import { Injectable } from '@nestjs/common';
import { TaskMongoService } from '../dataBase/services/task.service.mongo';

@Injectable()
export class TaskService extends TaskMongoService  {
}
