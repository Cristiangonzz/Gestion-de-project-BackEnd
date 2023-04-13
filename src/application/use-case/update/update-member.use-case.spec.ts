import { Types } from 'mongoose';
import { Observable } from "rxjs";
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { UpdateMemberUseCase } from './update-member.use-case';
import { MemberSchema } from 'src/infrastructura/dataBase/schema/member.shema.infrastructura.data-base';

describe('UpdateMemberUseCase', () => {
    let useCase: UpdateMemberUseCase;
    let service:  IMemberDomainService<MemberDomainEntity>;
  
    beforeEach(() => {
      service = {
          update: jest.fn(),
      } as any as   IMemberDomainService<MemberDomainEntity>;
      useCase = new UpdateMemberUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.actualizar', (done) => {
      // Arrange
      const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
      const payload: MemberDomainEntity = 
      { 
        name: "string",
        document: "string",
        salary: 13,
        role: "string",

        email:"string",
        password:"string",
      };
      const mockData: MemberDomainEntity = 
      { 
        name: "string",
        document: "string",
        salary: 13,
        role: "string",

        email:"string",
        password:"string",
      };
      const expectedData : MemberDomainEntity = 
      {
        name: "string",
        document: "string",
        salary: 13,
        role: "string",

        email:"string",
        password:"string",
      };
      const expectedInstanceType = Observable<MemberSchema>;
      const stubUpdate = jest.fn(() =>
          new Observable<MemberSchema>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
      jest.spyOn(service, 'update').mockReturnValue(stubUpdate());
  
      // Act
      const result = useCase.execute(_id.toString(), payload);
  
      // Assert
      expect(service.update).toHaveBeenCalledWith(_id.toString(),mockData);
      expect(result).toBeInstanceOf(expectedInstanceType);
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
        },
        complete: () => done(),
      });
    });
  });   