import { Observable } from "rxjs";
import { CollaborationDomainEntity } from "src/domain/entities/collaboration.entity.domain";
import { TeamDomainEntity } from "src/domain/entities/team.entity.domain";
import { ICollaborationDomainService } from "src/domain/services/collaboration.service.domain";
import { ITeamDomainService } from "src/domain/services/team.service.domain";
import { AgregateCollaborationOfTeamDto } from "src/infrastructura/dto/create/agregate-collaboration-of-team.dto";
import { GetCollaborationUseCase, GetTeamUseCase } from "../get";
import { AgregateCollaborationOfTeamUseCase } from "./agregate-collaboration-team.use-case";

describe('AgregateCollaborationOfTeamUseCase', () => {
  let useCase: AgregateCollaborationOfTeamUseCase;
  let service: ITeamDomainService<TeamDomainEntity>;
  let serviceMember :  ICollaborationDomainService<CollaborationDomainEntity>;

  beforeEach(() => {
    service = {
      update: jest.fn(),
      findOneBy: jest.fn(),
    } as any as  ITeamDomainService<TeamDomainEntity>;
    serviceMember = {
        findOneBy: jest.fn(),
    } as any as   ICollaborationDomainService<CollaborationDomainEntity>;

    useCase = new AgregateCollaborationOfTeamUseCase(service,serviceMember);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('call usecase ', (done) => {
    // Arrange
    const _idTeam = '641c65deff0153dd0f36bf5';
    const _idCollaboration = '641c65deff0153dd0f36bf6';
    const payload = 
    { 
        //_idTeam,
        name: "string",
        member: [""],
        task: [""],
        project: "string",
        collaboration: [""],
    };
    const mockData: TeamDomainEntity = 
    { 
        name: "string",
        member: [""],
        task: [""],
        project: "string",
        collaboration: [_idCollaboration],
    };
    const mockCollaboration : CollaborationDomainEntity = 
    { 

        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
    };
    const expectedData  = 
    {
    
        name: "string",
        member: [""],
        task: [""],
        project: "string",
        collaboration: [_idCollaboration],
    };
    const expectedInstanceType = Observable<TeamDomainEntity>;
    
    const stubUpdate = jest.fn(() =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    
    const registers : AgregateCollaborationOfTeamDto= 
    { 
        team: _idTeam,
        collaboration: _idCollaboration,
    };
    const stubFindOneBy = jest.fn(() =>
    new Observable<CollaborationDomainEntity>((subscriber) => {
      subscriber.next(mockCollaboration);
      subscriber.complete();
        }),
    );
    const stubFindOneByTeam = jest.fn(() =>
    new Observable<TeamDomainEntity>((subscriber) => {
      subscriber.next(mockData);
      subscriber.complete();
        }),
    );

    const getTaskSpy = jest.spyOn(GetCollaborationUseCase.prototype, 'execute');
    getTaskSpy.mockReturnValue(new Observable((subscriber) => {
      subscriber.next(mockCollaboration);
      subscriber.complete();
    }));

    const getTeamSpy = jest.spyOn(GetTeamUseCase.prototype, 'execute');
    getTeamSpy.mockReturnValue(new Observable((subscriber) => {
      subscriber.next(payload);
      subscriber.complete();
    }));
    jest.spyOn(service, 'update').mockReturnValue(stubUpdate());
    jest.spyOn(service, 'findOneBy').mockReturnValue(stubFindOneByTeam());
    jest.spyOn(serviceMember, 'findOneBy').mockReturnValue(stubFindOneBy());

    // Act
    const result = useCase.execute(registers);

    // Assert
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
      },
      complete: () => done(),
    });
  });
});
