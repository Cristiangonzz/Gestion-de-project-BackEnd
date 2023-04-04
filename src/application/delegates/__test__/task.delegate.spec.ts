import { Observable } from 'rxjs';
import * as UseCase from '../../use-case';
import { IProyectDomainService } from '../../../domain/services/proyect.service.domain';
import { TaskDelegate } from '../task.delegate';
import { TaskDomainEntity } from '../../../domain/entities/task.entity.domain';
import { ITaskDomainService } from '../../../domain/services/task.service.domain';


jest.mock('../../use-case/get/get-task-.use-case');
jest.mock('../../use-case/create/create-task-.use-case');
jest.mock('../../use-case/update/update-task-.use-case');
jest.mock('../../use-case/delete/delete-task-.use-case');

describe('TaskDelegate', () => {
  let delegator: TaskDelegate;
  let Service: ITaskDomainService<TaskDomainEntity>;
  const mockData = 
    {
      name: "cris",
      description: "hacer las pruebas unitarias",
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
    } as TaskDomainEntity;

  const expectedData = 
    {
      name: "cris",
      description: "hacer las pruebas unitarias",
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
    } as TaskDomainEntity;
    
  beforeEach(() => {
    // Arrange
    Service = {
      register: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as IProyectDomainService<TaskDomainEntity>;

    // Act
    delegator = new TaskDelegate(Service);
  });

  it('should be defined', () => {
    // Assert
    expect(delegator).toBeDefined();
  });

  it('should call Service.find', (done) => {
    // Arrange
    
    const expectedInstanceType = Observable<TaskDomainEntity[]>;
    const stubFind = jest.fn(
      () =>
        new Observable<TaskDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'GetTaskUseCase').mockReturnValue({
      execute: stubFind,
    } as any);

    // Act
    delegator.toFindTasks();
    const result = delegator.execute<Observable<TaskDomainEntity>>();

    // Assert
    expect(stubFind).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call Service.create', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload = {
      name: "cris",
      description: "hacer las pruebas unitarias",
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
     };
    const expectedData = { 
      _id, 
      name: "cris",
      description: "hacer las pruebas unitarias",
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
    };
    const expectedInstanceType = Observable<TaskDomainEntity>;
    const stubCreate = jest.fn(
      (task) =>
        new Observable<TaskDomainEntity>((subscriber) => {
          subscriber.next({ _id, ...task } as TaskDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'CreateTaskUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);

    // Act
    delegator.toCreateTask();
    const result = delegator.execute<Observable<TaskDomainEntity>>(payload);

    // Assert
    expect(stubCreate).toHaveBeenCalledWith(payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call Service.update', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
   
    const expectedData = 
    {
       _id, 
       name: "cris",
       description: "hacer las pruebas unitarias",
       dataExpiration: "20/10/1024",
       progress: "bastante",
       priority: "alta",
    };
    const expectedInstanceType = Observable<TaskDomainEntity>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<TaskDomainEntity>((subscriber) => {
          subscriber.next({ _id: id, ...data } as TaskDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateTaskUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    delegator.toUpdateTask();
    const result = delegator.execute<Observable<TaskDomainEntity>>(_id, mockData);

    // Assert
    expect(stubUpdate).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call Service.delete', (done) => {
    // Arrange
    const payload = '641c65deff0153dd0f36bf5';
    const mockData = true;
    const expectedData = true;
    const expectedInstanceType = Observable<boolean>;
    const stubDelete = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'DeleteTaskUseCase').mockReturnValue({
      execute: stubDelete,
    } as any);

    // Act
    delegator.toDeleteTask();
    const result = delegator.execute<Observable<boolean>>(payload);

    // Assert
    expect(stubDelete).toHaveBeenCalledWith(payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
