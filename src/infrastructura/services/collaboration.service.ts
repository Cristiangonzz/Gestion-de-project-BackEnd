import { Injectable } from '@nestjs/common';
import { CollaborationMongoService } from '../dataBase/services/collaboration.service.mongo';

@Injectable()
export class CollaborationService extends CollaborationMongoService  {
}
