import { Test, TestingModule } from "@nestjs/testing";
import { of ,lastValueFrom} from "rxjs";

import { ProjectController } from "./project.controller";
import { ProjectDomainEntity } from "../../domain/entities/project.entity.domain";
import { ProjectService } from "../services/project.service";
import { 
  GetProjectUseCase, 
  CreateProjectUseCase, 
  UpdateProjectUseCase,
  DeleteProjectUseCase } from "../../application/use-case";

describe('ProjectController', () => {

  let api: ProjectController;
  let service: ProjectService;

  const _id = '642b210464e2757b0151ec9b';

  const project: ProjectDomainEntity = {
    name: "cris",
    dataExpiration: "20/10/2024",
    progress: "avanzado",
    priority: "alta"
    }

  const mockaproject : ProjectDomainEntity = 
  {
    name: "cris",
    dataExpiration: "20/10/2024",
    progress: "avanzado",
    priority: "alta"
    };

  const expectedproject : ProjectDomainEntity = 
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
          provide: ProjectService,
          useValue: {},
        },
      ],
      controllers: [ProjectController],
    }).compile();

    api = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });


  it('should be defined', () => {
    expect(api).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Get', () => {
    it('must return a project', async () => {
      // Arrange
     jest
      .spyOn(GetProjectUseCase.prototype, 'execute')
      .mockReturnValue(of(project));

    // Act
    const result = api.getProject(_id);

    // Assert
    expect(await lastValueFrom(result)).toEqual((expectedproject));
    })
  });

  describe('create', () => {
    it('must return a project', async () => {
      // Arrange
    jest
      .spyOn(CreateProjectUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaproject));     

    // Act
    const result = api.createproject(project);      // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedproject));
      })
      });

   describe('update', () => {
    it('must return a member ', async () => {
      // Arrange
      
      jest
      .spyOn(UpdateProjectUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaproject))
  
      // Ac
      const result = api.updateTeam(_id,project)
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expectedproject));

      })
   
 
    describe('delete', () => {
      it('must return a true', async () => {
        // Arrange
      const project = true;  
     
      const expected = true;  
  
      jest
      .spyOn(DeleteProjectUseCase.prototype, 'execute')
      .mockReturnValue(of(project));  
   
    // Act  
    const result = api.deleteproject(_id);
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expected));
        })
        })
        
  });
});
