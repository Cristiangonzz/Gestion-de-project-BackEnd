import { CollaborationSchema } from "../schema/collaboration.shema.infrastructura.data-base";
import { CollaborationRepository } from "./collaboration.intrastructura.repositoy.data-base";
import { Model, Types } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { lastValueFrom, of } from "rxjs";
import { CollaborationDomainEntity } from "src/domain/entities/collaboration.entity.domain";

describe('CollaborationRepository', () => {
    let collaborationRepository: CollaborationRepository;
    let collaborationModel: Model<CollaborationSchema>;
    const collaboration : CollaborationDomainEntity= 
    {
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
    }

  const mock = 
    {
        _id: '641c70d41964e9445f593bcc',
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
    
    };
  const expected = 
  {
        _id: '641c70d41964e9445f593bcc',
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
    
  };
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            CollaborationRepository,
          {
            provide: getModelToken(CollaborationSchema.name),
            useValue: {
                create: jest.fn(),
                findOne: jest.fn(),
                findByIdAndUpdate: jest.fn(),
                findByIdAndDelete: jest.fn(),
                find: jest.fn(),
            },
          },
        ],
      }).compile();

      collaborationRepository = module.get<CollaborationRepository>(CollaborationRepository);
      collaborationModel = module.get<Model<CollaborationSchema>>(getModelToken(CollaborationSchema.name));
      
    });
  
    it('should be defined', () => {
      expect(collaborationRepository).toBeDefined();
      expect(collaborationModel).toBeDefined();
    });
  

    describe('create', () => {
        it('return collaboration', async () => {
          // Arrange
          
          jest.spyOn(collaborationModel, 'create').mockResolvedValue(mock as any);
    
          // Act
          const result = collaborationRepository.register(collaboration);
    
          // Assert
          expect(await lastValueFrom(result)).toEqual(expected);
        });
      });

   describe('findOneBy', () => {
     it('return collaboration', (done) => {
    // Arrange
       const collaborationId = "64331da60df2facaa291b6a9";

       jest.spyOn(collaborationModel, 'findOne').mockReturnValue(mock as any);

    // Act
       const result = collaborationRepository.findOneBy(collaborationId);
    
    // Assert
       result.subscribe({
         next: (result) =>  expect(result).toEqual(expected),
         complete: () => {
           done();
         },
       });
     });
   })
   describe('update', () => {
    it('return collaboration', (done) => {
   // Arrange
      const collaborationId = "64331da60df2facaa291b6a9";
      const collaborationSchema : CollaborationSchema= 
      {
          comment: "string",
          notification: "string",
          progress: "string",
          performence: "string",
      }
      jest.spyOn(collaborationModel, 'findByIdAndUpdate').mockReturnValue(of(mock) as any);

   // Act
      const result = collaborationRepository.update(collaborationId,collaborationSchema);
   
   // Assert
      result.subscribe({
        next: (result) =>  expect(result).toEqual(expected),
        complete: () => {
          done();
        },
      });
    });
  })


  describe('delete', () => {
    it('return  true', async () => {
      // Arrange
      const _id = new Types.ObjectId("641f1e79398d97022720784b");



      const expectedCollaboration: boolean = true;

      jest.spyOn(collaborationModel, 'findByIdAndDelete').mockReturnValue(of(mock) as any);

      // Act
      const result = collaborationRepository.delete(_id.toString());

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedCollaboration);
    });
  });

    
  describe('findAll', () => {
    it('return collaboration', (done) => {
   // Arrange
    jest.spyOn(collaborationModel, 'find').mockReturnValue(of(mock) as any);

   // Act
      const result = collaborationRepository.findAll();
   
   // Assert
      result.subscribe({
        next: (result) =>  expect(result).toEqual(expected),
        complete: () => {
          done();
        },
      });
    });
    })
  });