import { Model, Types } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { lastValueFrom, of } from "rxjs";
import { ProjectRepository } from "./project.intrastructura.repositoy.data-base";
import { ProjectSchema } from "../schema/project.shema.infrastructura.data-base";
import { ProjectDomainEntity } from "src/domain/entities/project.entity.domain";

describe('ProjectRepository', () => {
    let projectRepository: ProjectRepository;
    let projectModel: Model<ProjectSchema>;

    const project : ProjectDomainEntity= 
    {
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    }

  const mock = 
    {
        _id: '641c70d41964e9445f593bcc',
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    
    };
  const expected = 
  {
        _id: '641c70d41964e9445f593bcc',
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    
  };
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            ProjectRepository,
          {
            provide: getModelToken(ProjectSchema.name),
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

      projectRepository = module.get<ProjectRepository>(ProjectRepository);
      projectModel = module.get<Model<ProjectSchema>>(getModelToken(ProjectSchema.name));
      
    });
  
    it('should be defined', () => {
      expect(projectRepository).toBeDefined();
      expect(projectModel).toBeDefined();
    });
  

    describe('create', () => {
        it('return project', async () => {
          // Arrange
          
          jest.spyOn(projectModel, 'create').mockResolvedValue(mock as any);
    
          // Act
          const result = projectRepository.register(project);
    
          // Assert
          expect(await lastValueFrom(result)).toEqual(expected);
        });
      });

   describe('findOneBy', () => {
     it('return project', (done) => {
    // Arrange
       const projectId = "64331da60df2facaa291b6a9";

       jest.spyOn(projectModel, 'findOne').mockReturnValue(mock as any);

    // Act
       const result = projectRepository.findOneBy(projectId);
    
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
    it('return project', (done) => {
   // Arrange
      const projectId = "64331da60df2facaa291b6a9";

      const ProjectSchema : ProjectSchema= 
        {
            name: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
        }
      jest.spyOn(projectModel, 'findByIdAndUpdate').mockReturnValue(of(mock) as any);

   // Act
      const result = projectRepository.update(projectId,ProjectSchema);
   
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



      const expectedproject: boolean = true;

      jest.spyOn(projectModel, 'findByIdAndDelete').mockReturnValue(of(mock) as any);

      // Act
      const result = projectRepository.delete(_id.toString());

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedproject);
    });
  });

    
  describe('findAll', () => {
    it('return project', (done) => {
   // Arrange
    jest.spyOn(projectModel, 'find').mockReturnValue(of(mock) as any);

   // Act
      const result = projectRepository.findAll();
   
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
