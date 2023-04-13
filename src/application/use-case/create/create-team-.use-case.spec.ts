import { Observable } from 'rxjs';
import { CreateTeamUseCase } from './create-team-.use-case';
import { ITeamDomainService } from 'src/domain/services/team.service.domain';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { RegisterTeamDto } from 'src/infrastructura/dto/create/register-team.dto';
import { ProjectDomainEntity } from 'src/domain/entities/project.entity.domain';
import { IProjectDomainService } from 'src/domain/services/project.service.domain';

describe('CreateTeamUseCase', () => {
  let useCase: CreateTeamUseCase;
  let service: ITeamDomainService<TeamDomainEntity>;
  let serviceProject : IProjectDomainService<ProjectDomainEntity>;

  beforeEach(() => {
    service = {
        register: jest.fn(),
    } as any as  ITeamDomainService<TeamDomainEntity>;
    serviceProject = {
        findOneBy: jest.fn(),
    } as any as  IProjectDomainService<ProjectDomainEntity>;

    useCase = new CreateTeamUseCase(service,serviceProject);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('llamar a service.registrar', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload: TeamDomainEntity = 
    { 
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
        collaboration: [""],
    };
    const mockProject: ProjectDomainEntity = 
    { 
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    };
    const expectedData : TeamDomainEntity = 
    {
        name: "string",
        member: [""],
        task: [""],
        project: "string",
        collaboration: [""],
    };
    const expectedInstanceType = Observable<TeamDomainEntity>;
    
    const stubRegistrar = jest.fn(() =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    
    const registers: RegisterTeamDto = 
    { 
        name: "string",
        project: "string",
        member: [""],
        task: [""],
        collaboration: [""],
    };
    const stubFindOneBy = jest.fn(() =>
    new Observable<ProjectDomainEntity>((subscriber) => {
      subscriber.next(mockProject);
      subscriber.complete();
        }),
    );

    
    jest.spyOn(service, 'register').mockReturnValue(stubRegistrar());
    jest.spyOn(serviceProject, 'findOneBy').mockReturnValue(stubFindOneBy());

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
