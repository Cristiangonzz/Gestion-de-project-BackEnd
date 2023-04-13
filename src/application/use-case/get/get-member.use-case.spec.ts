import { GetMemberUseCase } from './get-member.use-case';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';

import { Observable } from 'rxjs';
describe('GetMemberUseCase', () => {
    let useCase: GetMemberUseCase;
    let service: IMemberDomainService<MemberDomainEntity>;
  
    beforeEach(() => {
      service = {
          findOneBy: jest.fn(),
      } as any as  IMemberDomainService<MemberDomainEntity>;
      useCase = new GetMemberUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.registrar', (done) => {
      // Arrange
      const _id = '641c65deff0153dd0f36bf5';
      const payload = 
      { 
            name: "string",
            document: "string",
            salary: 12,
            role: "string",

            email:"string",
            password:"string",
          
      };
      const mockData = 
      { 
      
        name: "string",
        document: "string",
        salary: 12,
        role: "string",

        email:"string",
        password:"string",
      };

      const expectedData = 
      {
            name: "string",
            document: "string",
            salary: 12,
            role: "string",

            email:"string",
            password:"string",
      };

      const expectedInstanceType = Observable<MemberDomainEntity>;
      const stubRegistrar = jest.fn(() =>
          new Observable<MemberDomainEntity>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
      jest.spyOn(service, 'findOneBy').mockReturnValue(stubRegistrar());
  
      // Act
      const result = useCase.execute(_id);
  
      // Assert
      expect(service.findOneBy).toHaveBeenCalledWith(_id);
      expect(result).toBeInstanceOf(expectedInstanceType);
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
        },
        complete: () => done(),
      });
    });
  });
  