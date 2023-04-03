import { Injectable } from '@nestjs/common';
import { TeamMongoService } from '../dataBase/services/team.service.mongo';

@Injectable()
export class TeamService extends TeamMongoService  {
}
