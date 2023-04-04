import { Observable } from 'rxjs';
import { ProyectDomainEntity } from 'src/domain/entities/proyect.entity.domain';
import { IProyectDomainService } from 'src/domain/services/proyect.service.domain';
import { CreateProyectDto } from 'src/infrastructura/dto/create/create-proyect.dto';

export class DeleteProyectUseCase {  
   
    constructor(private readonly proyectService: IProyectDomainService<ProyectDomainEntity>) { }

        execute(data: string): Observable<boolean> {

            return this.proyectService.delete(data);
    }
}

         