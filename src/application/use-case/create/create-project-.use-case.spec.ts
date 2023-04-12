import { Observable } from 'rxjs';
import { CreateProjectUseCase } from './create-project-.use-case';
import { ProjectDomainEntity } from 'src/domain/entities/project.entity.domain';
import { IProjectDomainService } from 'src/domain/services/project.service.domain';

describe('CreateProjectUseCase', () => {
  let useCase: CreateProjectUseCase;
  let service: IProjectDomainService<ProjectDomainEntity>;

  beforeEach(() => {
    service = {
        register: jest.fn(),
    } as any as  IProjectDomainService<ProjectDomainEntity>;
    useCase = new CreateProjectUseCase(service);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('llamar a service.registrar', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload: ProjectDomainEntity = 
    { 
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    };
    const mockData: ProjectDomainEntity = 
    { 
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    };
    const expectedData : ProjectDomainEntity = 
    {
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    };
    const expectedInstanceType = Observable<ProjectDomainEntity>;
    const stubRegistrar = jest.fn(() =>
        new Observable<ProjectDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'register').mockReturnValue(stubRegistrar());

    // Act
    const result = useCase.execute(payload);

    // Assert
    expect(service.register).toHaveBeenCalledWith(mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
      },
      complete: () => done(),
    });
  });
});
