import { Observable } from 'rxjs';
import * as UseCase from '../../use-case';

import { CollaborationDelegate } from '../collaboration.delegate';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';

jest.mock('../../use-case/get/get-collaboration-.use-case');
jest.mock('../../use-case/create/create-collaboration-.use-case');
jest.mock('../../use-case/update/update-collaboration-.use-case');
jest.mock('../../use-case/delete/delete-collaboration.use-case');

describe('CollaborationDelegate', () => {
  let delegator: CollaborationDelegate;
  let Service: ICollaborationDomainService<CollaborationDomainEntity>;
  const mockData = 
    {
      comment: "cris",
      notification: "123",
      progress: "exelente",
      performence: "alto",
    } as CollaborationDomainEntity;

  const expectedData = 
    {
      comment: "cris",
      notification: "123",
      progress: "exelente",
      performence: "alto",
    } as CollaborationDomainEntity;
    
  beforeEach(() => {
    // Arrange
    Service = {
      register: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as ICollaborationDomainService<CollaborationDomainEntity>;

    // Act
    delegator = new CollaborationDelegate(Service);
  });

  it('should be defined', () => {
    // Assert
    expect(delegator).toBeDefined();
  });

  it('should call Service.find', (done) => {
    // Arrange
    
    const expectedInstanceType = Observable<CollaborationDomainEntity[]>;
    const stubFind = jest.fn(
      () =>
        new Observable<CollaborationDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'GetCollaborationUseCase').mockReturnValue({
      execute: stubFind,
    } as any);

    // Act
    delegator.toFindCollaborations();
    const result = delegator.execute<Observable<CollaborationDomainEntity>>();

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
      comment: "cris",
      notification: "123",
      progress: "exelente",
      performence: "alto",
     };
    const expectedData = { 
      _id, 
      comment: "cris",
      notification: "123",
      progress: "exelente",
      performence: "alto",
    };
    const expectedInstanceType = Observable<CollaborationDomainEntity>;
    const stubCreate = jest.fn(
      (collaboration) =>
        new Observable<CollaborationDomainEntity>((subscriber) => {
          subscriber.next({ _id, ...collaboration } as CollaborationDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'CreateCollaborationUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);

    // Act
    delegator.toCreateCollaboration();
    const result = delegator.execute<Observable<CollaborationDomainEntity>>(payload);

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
       comment: "cris",
      notification: "123",
      progress: "exelente",
      performence: "alto",
    };
    const expectedInstanceType = Observable<CollaborationDomainEntity>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<CollaborationDomainEntity>((subscriber) => {
          subscriber.next({ _id: id, ...data } as CollaborationDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateCollaborationUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    delegator.toUpdateCollaboration();
    const result = delegator.execute<Observable<CollaborationDomainEntity>>(_id, mockData);

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
    jest.spyOn(UseCase, 'DeleteCollaborationUseCase').mockReturnValue({
      execute: stubDelete,
    } as any);

    // Act
    delegator.toDeleteCollaboration();
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
