import { Test, TestingModule } from "@nestjs/testing";
import { of ,lastValueFrom} from "rxjs";

import { TaskService } from "../services/task.service";
import { AgregateCollaborationOfTeamUseCase, AgregateMemberOfTeamUseCase, AgregateTaskOfTeamUseCase, CreateTaskUseCase, CreateTeamUseCase, DeleteTaskUseCase, DeleteTeamUseCase, GetTaskUseCase, GetTeamUseCase, UpdateTaskUseCase, UpdateTeamUseCase } from "../../application/use-case";
import { TeamController } from "./team.controller";
import { TeamService } from "../services/team.service";
import { CollaborationService } from "../services/collaboration.service";
import { MemberService } from "../services/member.service";
import { TeamDomainEntity } from "../../domain/entities/team.entity.domain";
import { AgregateMemberOfTeamDto } from "../dto/create/agregate-member-of-team.dto";
import { AgregateTaskOfTeamDto } from "../dto/create/agregate-task-of-team.dto";
import { AgregateCollaborationOfTeamDto } from "../dto/create/agregate-collaboration-of-team.dto";
import { ProjectService } from "../services/project.service";


describe('TeamController', () => {

  let api: TeamController;
  let serviceTeam: TeamService;
  let serviceTask: TaskService;
  let serviceCollaboration: CollaborationService;
  let serviceMember: MemberService;
  let serviceProject: ProjectService;
  const _id = '642b210464e2757b0151ec9b';

  const Team: TeamDomainEntity = 
    {
      name: "string",
      member: [""],
      task: [""],
      project: "string",
      collaboration: [""],
    }

    const mockaTeam : TeamDomainEntity = 
    {
      name: "string",
      member: [""],
      task: [""],
      project: "string",
      collaboration: [""],
    };

  const expectedTeam : TeamDomainEntity = 
    {

      name: "string",
      member: [""],
      task: [""],
      project: "string",
      collaboration: [""],
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TeamService,
          useValue: {},
        },
        {
          provide: TaskService,
          useValue: {},
        },
        {
          provide: CollaborationService,
          useValue: {},
        },
        {
          provide: MemberService,
          useValue: {},
        },
        {
          provide: ProjectService,
          useValue: {},
        },
      ],
      controllers: [TeamController],
    }).compile();

    api = module.get<TeamController>(TeamController);
    serviceTeam = module.get<TeamService>(TeamService);
    serviceCollaboration = module.get<CollaborationService>(CollaborationService);
    serviceTask = module.get<TaskService>(TaskService);
    serviceMember = module.get<MemberService>(MemberService);
    serviceProject = module.get<ProjectService>(ProjectService);
  });


  it('should be defined', () => {
    expect(api).toBeDefined();
    expect(serviceTeam).toBeDefined();
    expect(serviceCollaboration).toBeDefined();
    expect(serviceTask).toBeDefined();
    expect(serviceMember).toBeDefined();
    expect(serviceProject).toBeDefined();
  });

  describe('Get', () => {
    it('must return a Team', async () => {
      // Arrange
     jest
      .spyOn(GetTeamUseCase.prototype, 'execute')
      .mockReturnValue(of(Team));

    // Act
    const result = api.GetTeam(_id);

    // Assert
    expect(await lastValueFrom(result)).toEqual((expectedTeam));
    })
  });

  describe('create', () => {
    it('must return a Team', async () => {
      // Arrange
    jest
      .spyOn(CreateTeamUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaTeam));     

    // Act
    const result = api.crearTeam(Team);      // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedTeam));
      })
      });

   describe('update', () => {
    it('must return a Team ', async () => {
      // Arrange
      
      jest
      .spyOn(UpdateTeamUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaTeam))
  
      // Ac
      const result = api.updateTeam(_id,Team)
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expectedTeam));

      })
   
 
    describe('delete', () => {
      it('must return a true', async () => {
        // Arrange
      const Team = true;  
     
      const expected = true;  
  
      jest
      .spyOn(DeleteTeamUseCase.prototype, 'execute')
      .mockReturnValue(of(Team));  
   
    // Act  
    const result = api.deleteTeam(_id);
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expected));
        })
      })
        
  });


  describe('aggregate member', () => {
    it('must return a Team', async () => {
      // Arrange
      const aggregateTeam : AgregateMemberOfTeamDto = {
        team: "64444014006d5a398ac395db",
        member: "64344014006d5a398ac395db",
      }
    jest
      .spyOn(AgregateMemberOfTeamUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaTeam));     

    // Act
    const result = api.agregateMemberOfTeam(aggregateTeam);     
    
    // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedTeam));
      })
      });

  describe('aggregate task', () => {
    it('must return a Team', async () => {
      // Arrange
      const aggregateTeam : AgregateTaskOfTeamDto = {
        team: "64444014006d5a398ac395db",
        task: "64344014006d5a398ac395db",
      }
    jest
      .spyOn(AgregateTaskOfTeamUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaTeam));     

    // Act
    const result = api.agregateTaskOfTeam(aggregateTeam);     
    
    // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedTeam));
      })
      });

  describe('aggregate collaboration', () => {
    it('must return a Team', async () => {
      // Arrange
      const aggregateTeam : AgregateCollaborationOfTeamDto = {
        team: "64444014006d5a398ac395db",
        collaboration: "64344014006d5a398ac395db",
      }
    jest
      .spyOn(AgregateCollaborationOfTeamUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaTeam));     

    // Act
    const result = api.agregateCollaborationOfTeam(aggregateTeam);     
    
    // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedTeam));
      })
      });
          

  
});
