import { Observable } from 'rxjs';
import { CreateTaskUseCase } from './create-task-.use-case';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let service: ITaskDomainService<TaskDomainEntity>;

  beforeEach(() => {
    service = {
        register: jest.fn(),
    } as any as  ITaskDomainService<TaskDomainEntity>;
    useCase = new CreateTaskUseCase(service);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('llamar a service.registrar', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload: TaskDomainEntity = 
    { 
        name: "string",
        description: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    };
    const mockData: TaskDomainEntity = 
    { 
        name: "string",
        description: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    };
    const expectedData : TaskDomainEntity = 
    {
        name: "string",
        description: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    };
    const expectedInstanceType = Observable<TaskDomainEntity>;
    const stubRegistrar = jest.fn(() =>
        new Observable<TaskDomainEntity>((subscriber) => {
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
