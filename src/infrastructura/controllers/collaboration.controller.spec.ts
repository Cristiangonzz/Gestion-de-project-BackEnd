import { Test, TestingModule } from "@nestjs/testing";
import { of ,lastValueFrom} from "rxjs";


import { CollaborationService } from "../services/collaboration.service";
import { CollaborationController } from "./collaboration.controller";
import { CollaborationDomainEntity } from "../../domain/entities/collaboration.entity.domain";
import { DeleteCollaborationUseCase } from "../../application/use-case/delete/delete-collaboration.use-case";
import { CreateCollaborationUseCase } from "../../application/use-case/create/create-collaboration-.use-case";
import { GetCollaborationUseCase } from "../../application/use-case/get/get-collaboration-.use-case";
import { UpdateCollaborationUseCase } from "../../application/use-case/update/update-collaboration-.use-case";
import { CreateCollaborationDto } from "../dto/create/create-collaboration.dto";


describe('CollaborationController', () => {

  let api: CollaborationController;
  let service: CollaborationService;

  const _id = '642b210464e2757b0151ec9b';

  const Collaboration: CreateCollaborationDto = 
    {
        comment: "hacer las pruebas unitarias",
        notification: "20/10/2024",
        progress: "avanzado",
        performence: "alta"
    }

    const mockaCollaboration : CollaborationDomainEntity = 
    {
        comment: "hacer las pruebas unitarias",
        notification: "20/10/2024",
        progress: "avanzado",
        performence: "alta"
    };

  const expectedCollaboration : CollaborationDomainEntity = 
    {

        comment: "hacer las pruebas unitarias",
        notification: "20/10/2024",
        progress: "avanzado",
        performence: "alta"
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CollaborationService,
          useValue: {},
        },
      ],
      controllers: [CollaborationController],
    }).compile();

    api = module.get<CollaborationController>(CollaborationController);
    service = module.get<CollaborationService>(CollaborationService);
  });


  it('should be defined', () => {
    expect(api).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Get', () => {
    it('must return a Collaboration', async () => {
      // Arrange
     jest
      .spyOn(GetCollaborationUseCase.prototype, 'execute')
      .mockReturnValue(of(Collaboration));

    // Act
    const result = api.getCollaboration(_id);

    // Assert
    expect(await lastValueFrom(result)).toEqual((expectedCollaboration));
    })
  });

  describe('create', () => {
    it('must return a Collaboration', async () => {
      // Arrange
    jest
      .spyOn(CreateCollaborationUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaCollaboration));     

    // Act
    const result = api.createCollaboration(Collaboration);      // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedCollaboration));
      })
      });

   describe('update', () => {
    it('must return a member ', async () => {
      // Arrange
      
      jest
      .spyOn(UpdateCollaborationUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaCollaboration))
  
      // Ac
      const result = api.updateCollaboration(_id,Collaboration)
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expectedCollaboration));

      })
   
 
    describe('delete', () => {
      it('must return a true', async () => {
        // Arrange
      const Collaboration = true;  
     
      const expected = true;  
  
      jest
      .spyOn(DeleteCollaborationUseCase.prototype, 'execute')
      .mockReturnValue(of(Collaboration));  
   
    // Act  
    const result = api.deleteCollaboration(_id);
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expected));
        })
        })
        
  });
});
