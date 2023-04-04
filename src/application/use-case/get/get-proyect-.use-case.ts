import { Observable } from 'rxjs';
import { ProyectDomainEntity } from '../../../domain/entities/proyect.entity.domain';
import { IProyectDomainService } from '../../../domain/services/proyect.service.domain';
import { CreateProyectDto } from '../../../infrastructura/dto/create/create-proyect.dto';

export class GetProyectUseCase {  
   
    constructor(private readonly proyectService: IProyectDomainService<ProyectDomainEntity>) { }

        execute(data: string): Observable<ProyectDomainEntity> {

            return this.proyectService.findOneBy(data);
    }
}

         