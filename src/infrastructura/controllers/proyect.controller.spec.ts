import { Test, TestingModule } from "@nestjs/testing";
import { of ,lastValueFrom} from "rxjs";

import { ProyectController } from "./proyect.controller";
import { ProyectService } from "../services/proyect.service";
import { ProyectDomainEntity } from "../../domain/entities/proyect.entity.domain";
import { GetProyectUseCase } from "../../application/use-case/get/get-proyect-.use-case";
import { CreateProyectUseCase } from "../../application/use-case/create/create-proyect-.use-case";
import { UpdateProyectUseCase } from "../../application/use-case/update/update-proyect-.use-case";
import { DeleteProyectUseCase } from "../../application/use-case/delete/delete-proyect-.use-case";

describe('ProyectController', () => {

  let api: ProyectController;
  let service: ProyectService;

  const _id = '642b210464e2757b0151ec9b';

  const Proyect: ProyectDomainEntity = {
    name: "cris",
    dataExpiration: "20/10/2024",
    progress: "avanzado",
    priority: "alta"
    }

  const mockaProyect : ProyectDomainEntity = 
  {
    name: "cris",
    dataExpiration: "20/10/2024",
    progress: "avanzado",
    priority: "alta"
    };

  const expectedProyect : ProyectDomainEntity = 
    {

        name: "cris",
        dataExpiration: "20/10/2024",
        progress: "avanzado",
        priority: "alta"
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProyectService,
          useValue: {},
        },
      ],
      controllers: [ProyectController],
    }).compile();

    api = module.get<ProyectController>(ProyectController);
    service = module.get<ProyectService>(ProyectService);
  });


  it('should be defined', () => {
    expect(api).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Get', () => {
    it('must return a Proyect', async () => {
      // Arrange
     jest
      .spyOn(GetProyectUseCase.prototype, 'execute')
      .mockReturnValue(of(Proyect));

    // Act
    const result = api.getProject(_id);

    // Assert
    expect(await lastValueFrom(result)).toEqual((expectedProyect));
    })
  });

  describe('create', () => {
    it('must return a proyect', async () => {
      // Arrange
    jest
      .spyOn(CreateProyectUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaProyect));     

    // Act
    const result = api.createProyect(Proyect);      // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedProyect));
      })
      });

   describe('update', () => {
    it('must return a member ', async () => {
      // Arrange
      
      jest
      .spyOn(UpdateProyectUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaProyect))
  
      // Ac
      const result = api.updateTeam(_id,Proyect)
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expectedProyect));

      })
   
 
    describe('delete', () => {
      it('must return a true', async () => {
        // Arrange
      const proyect = true;  
     
      const expected = true;  
  
      jest
      .spyOn(DeleteProyectUseCase.prototype, 'execute')
      .mockReturnValue(of(proyect));  
   
    // Act  
    const result = api.deleteProyect(_id);
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expected));
        })
        })
        
  });
});
