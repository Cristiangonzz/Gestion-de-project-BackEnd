import { Injectable } from '@nestjs/common';
import { ProyectMongoService } from '../dataBase/services/proyect.service.mongo';

@Injectable()
export class ProyectService extends ProyectMongoService  {
}
