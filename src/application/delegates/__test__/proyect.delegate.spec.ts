import { Observable } from 'rxjs';
import * as UseCase from '../../use-case';
import { ProjectDelegate } from '../project.delegate';
import { ProjectDomainEntity } from '../../../domain/entities/project.entity.domain';
import { IProjectDomainService } from '../../../domain/services/project.service.domain';


jest.mock('../../use-case/get/get-project-.use-case');
jest.mock('../../use-case/create/create-project-.use-case');
jest.mock('../../use-case/update/update-project-.use-case');
jest.mock('../../use-case/delete/delete-project-.use-case');

describe('ProjectDelegate', () => {
  let delegator: ProjectDelegate;
  let Service: IProjectDomainService<ProjectDomainEntity>;
  const mockData = 
    {
      name: "cris",
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
    } as ProjectDomainEntity;

  const expectedData = 
    {
      name: "cris",
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
    } as ProjectDomainEntity;
    
  beforeEach(() => {
    // Arrange
    Service = {
      register: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as IProjectDomainService<ProjectDomainEntity>;

    // Act
    delegator = new ProjectDelegate(Service);
  });

  it('should be defined', () => {
    // Assert
    expect(delegator).toBeDefined();
  });

  it('should call Service.find', (done) => {
    // Arrange
    
    const expectedInstanceType = Observable<ProjectDomainEntity[]>;
    const stubFind = jest.fn(
      () =>
        new Observable<ProjectDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'GetProjectUseCase').mockReturnValue({
      execute: stubFind,
    } as any);

    // Act
    delegator.toFindProjects();
    const result = delegator.execute<Observable<ProjectDomainEntity>>();

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
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
     };
    const expectedData = { 
      _id, 
      name: "cris",
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
    };
    const expectedInstanceType = Observable<ProjectDomainEntity>;
    const stubCreate = jest.fn(
      (project) =>
        new Observable<ProjectDomainEntity>((subscriber) => {
          subscriber.next({ _id, ...project } as ProjectDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'CreateProjectUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);

    // Act
    delegator.toCreateProject();
    const result = delegator.execute<Observable<ProjectDomainEntity>>(payload);

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
      dataExpiration: "20/10/1024",
      progress: "bastante",
      priority: "alta",
    };
    const expectedInstanceType = Observable<ProjectDomainEntity>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<ProjectDomainEntity>((subscriber) => {
          subscriber.next({ _id: id, ...data } as ProjectDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateProjectUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    delegator.toUpdateProject();
    const result = delegator.execute<Observable<ProjectDomainEntity>>(_id, mockData);

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
    jest.spyOn(UseCase, 'DeleteProjectUseCase').mockReturnValue({
      execute: stubDelete,
    } as any);

    // Act
    delegator.toDeleteProject();
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
