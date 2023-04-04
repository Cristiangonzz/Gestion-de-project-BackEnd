import { Observable } from 'rxjs';
import * as UseCase from '../../use-case';

import { MemberDelegate } from '../member.delegate';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';

jest.mock('../../use-case/get/get-member.use-case');
jest.mock('../../use-case/create/register-member.use-case');
jest.mock('../../use-case/update/update-member.use-case');
jest.mock('../../use-case/delete/delete-member.use-case');

describe('MemberDelegate', () => {
  let delegator: MemberDelegate;
  let Service: IMemberDomainService<MemberDomainEntity>;
  const mockData = 
    {
      name: "cris",
      document: "123",
      salary: 100,
      role: "programmer",
  
      email:"cris@gmail.com",
      password:"pepe123",
    } as MemberDomainEntity;

  const expectedData = 
    {
      name: "cris",
      document: "123",
      salary: 100,
      role: "programmer",
  
      email:"cris@gmail.com",
      password:"pepe123",
    } as MemberDomainEntity;
    
  beforeEach(() => {
    // Arrange
    Service = {
      register: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findOneByEmail: jest.fn(),
    } as IMemberDomainService<MemberDomainEntity>;

    // Act
    delegator = new MemberDelegate(Service);
  });

  it('should be defined', () => {
    // Assert
    expect(delegator).toBeDefined();
  });

  it('should call Service.find', (done) => {
    // Arrange
    
    const expectedInstanceType = Observable<MemberDomainEntity[]>;
    const stubFind = jest.fn(
      () =>
        new Observable<MemberDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'GetMemberUseCase').mockReturnValue({
      execute: stubFind,
    } as any);

    // Act
    delegator.toFindMembers();
    const result = delegator.execute<Observable<MemberDomainEntity>>();

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
      document: "123",
      salary: 100,
      role: "programmer",
  
      email:"cris@gmail.com",
      password:"pepe123",
     };
    const expectedData = { 
      _id, 
      name: "cris",
      document: "123",
      salary: 100,
      role: "programmer",
  
      email:"cris@gmail.com",
      password:"pepe123",
    };
    const expectedInstanceType = Observable<MemberDomainEntity>;
    const stubCreate = jest.fn(
      (member) =>
        new Observable<MemberDomainEntity>((subscriber) => {
          subscriber.next({ _id, ...member } as MemberDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'RegisterMemberUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);

    // Act
    delegator.toCreateMember();
    const result = delegator.execute<Observable<MemberDomainEntity>>(payload);

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
      document: "123",
      salary: 100,
      role: "programmer",
  
      email:"cris@gmail.com",
      password:"pepe123",
    };
    const expectedInstanceType = Observable<MemberDomainEntity>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<MemberDomainEntity>((subscriber) => {
          subscriber.next({ _id: id, ...data } as MemberDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateMemberUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    delegator.toUpdateMember();
    const result = delegator.execute<Observable<MemberDomainEntity>>(_id, mockData);

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
    jest.spyOn(UseCase, 'DeleteMemberUseCase').mockReturnValue({
      execute: stubDelete,
    } as any);

    // Act
    delegator.toDeleteMember();
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
