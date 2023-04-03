import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import {  RegistrarPersonaDto } from '../dto/registrar-persona.dto';
import { PersonaService } from '../service/persona.service';
import { PersonaRegistradaPublisher } from '../messanging/publisher/persona/persona-registrado.publisher';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { PersonaDomainEntity } from '../../dominio/model/persona';
import { BuscarMail } from '../dto/buscar-mail..dto';
import { RegistrarPersonaoUseCase } from '../../aplicacion/useCase/persona/registrar-persona.use-case';
import { BuscarPersonaUseCase } from '../../aplicacion/useCase/persona/buscar-persona.use-case';
import { PersonaBuscadaPublisher } from '../messanging/publisher/persona/persona-buscada.publisher';
import { EditarPersonaoUseCase } from '../../aplicacion/useCase/persona/editar-persona.use-case';
import { PersonaEditadaPublisher } from '../messanging/publisher/persona/persona-editada.publisher';
import { PersonaEliminadaPublisher } from '../messanging/publisher/persona/persona-eliminada.publisher';
import { PersonaDocument, PersonaSchema } from '../dataBase/schema/persona.shema';
import { EliminarPersonaoUseCase } from '../../aplicacion/useCase/persona/eliminar-persona.use-case';
import { LogearseDto } from '../dto/logarse.dto';
import { LogearPersonaoUseCase } from '../../aplicacion/useCase/persona/login-persona.use-case';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Persona')
@Controller('persona')
export class PersonaController {
    constructor(
        private readonly personaService: PersonaService ) {}
    @ApiOperation ({summary: "Crear  Persona"})
    @Post('/crear')
     /**
      * The function crearPersona() takes a RegistrarPersonaDto object as a parameter, and returns an
      * Observable of type PersonaDomainEntity.
      * @param {RegistrarPersonaDto} persona - RegistrarPersonaDto
      * @returns The observable is being returned.
      */
     crearPersona(@Body() persona: RegistrarPersonaDto):Observable<PersonaDomainEntity> {
        const caso = new RegistrarPersonaoUseCase(this.personaService);
        return caso.execute(persona)
        .pipe(
            tap((persona:RegistrarPersonaDto) => {
                this.personaRegistradaPublisher.publish(persona);
            },
            (error:Error) => {
                console.log(error);
            }));
    }

    @ApiOperation ({summary: "Buscar  Persona"})
     @Get('buscar')
     /**
      * The function receives a body with a mail, then it creates a new instance of
      * BuscarPersonaUseCase, then it executes the function execute of BuscarPersonaUseCase, then it
      * publishes the data, then it catches the error and throws a new error.
      * @param {BuscarMail} id - BuscarMail
      * @returns The observable of the domain entity.
      */
     buscarPersona(@Body() id: BuscarMail ):Observable<PersonaDomainEntity>{
        const caso = new BuscarPersonaUseCase(this.personaService);
        
        return caso.execute(id.mail).pipe(tap((data: PersonaDomainEntity) =>{
            this.personaBuscadaPublisher.publish(data);
        }),
        catchError((error) => {
            // Manejo de errores
            console.error('Se produjo un error al buscar la persona', error);
            throw new Error('No se pudo buscar la persona');
          }));
     }

    @ApiOperation ({summary: "Editar  Persona"})
    @Put('editar/:id')
       /**
        * This function takes an id and a body, and returns an observable of a PersonaSchema
        * @param {string} id - string: The id of the person to be edited.
        * @param {RegistrarPersonaDto} personaEditada - RegistrarPersonaDto
        * @returns The observable of the edited person.
        */
       editarPersona(@Param('id') id : string,@Body() personaEditada: RegistrarPersonaDto ):Observable<PersonaSchema>{  
            const caso = new EditarPersonaoUseCase(this.personaService);
            return caso.execute(id,personaEditada).pipe(tap((data: PersonaDomainEntity) =>{
               this.personaEditadaPublisher.publish(data);
           }),
           catchError((error) => {
               // Manejo de errores
               console.error('Se produjo un error al editar la persona', error);
               throw new Error('No se pudo editar la persona');
             }));
       }

    @ApiOperation ({summary: "Eliminar  Persona"})
    @Delete('eliminar/:id')
        /**
         * "The function receives an id, creates a new instance of the EliminarPersonaoUseCase class,
         * and then calls the execute method of the instance, passing the id as a parameter. The
         * execute method returns an Observable, which is then piped to the tap method, which publishes
         * the data to the personaEliminadaPublisher, and then the catchError method is called, which
         * handles errors."
         * </code>
         * @param {string} id - string
         * @returns The observable is being returned.
         */
        eliminarPersona(@Param('id') id: string ):Observable<boolean>{

            const caso = new EliminarPersonaoUseCase(this.personaService)
            return caso.execute(id)
                .pipe(
                    tap((data: boolean) =>{
                    this.personaEliminadaPublisher.publish(data);
            }),
            catchError((error) => {
                // Manejo de errores
                console.error('Se produjo un error al eliminar la persona', error);
                throw new Error('No se pudo eliminar la persona');
              }));
        }
    
    @ApiOperation ({summary: "Iniciar Sesion Persona"})
    @Post(`signIn`) 
    /**
     * This function takes a LogearseDto object as a parameter, and returns an Observable of type
     * string.
     * @param {LogearseDto} user - LogearseDto
     * @returns A string.
     */
    signIn(@Body() user: LogearseDto): Observable<string>{
        const caso = new LogearPersonaoUseCase(this.personaService);
        return caso.execute(user);
    }

}