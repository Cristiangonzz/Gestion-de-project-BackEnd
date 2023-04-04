import { Observable } from 'rxjs';
import { ProyectDomainEntity } from '../../../domain/entities/proyect.entity.domain';
import { IProyectDomainService } from '../../../domain/services/proyect.service.domain';
import { CreateProyectDto } from '../../../infrastructura/dto/create/create-proyect.dto';

export class DeleteProyectUseCase {  
   
    constructor(private readonly proyectService: IProyectDomainService<ProyectDomainEntity>) { }

        execute(data: string): Observable<boolean> {

            return this.proyectService.delete(data);
    }
}

         