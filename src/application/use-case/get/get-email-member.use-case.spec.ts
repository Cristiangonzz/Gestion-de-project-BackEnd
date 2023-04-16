import { Observable } from 'rxjs';

import { GetEmailMemberUseCase } from './get-email-member.use-case';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';

describe('GetEmailMemberUseCase', () => {
    let useCase: GetEmailMemberUseCase;
    let service: IMemberDomainService<MemberDomainEntity>;
  
    beforeEach(() => {
      service = {
        findOneByEmail: jest.fn(),
      } as any as  IMemberDomainService<MemberDomainEntity>;
      useCase = new GetEmailMemberUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.registrar', (done) => {
      // Arrange
      const _id = 'string@gmail.com';
      const payload = 
      { 
            name: "string",
            document: "string",
            salary: 12,
            role: "string",

            email:"string@gmail.com",
            password:"string",
          
      };
      const mockData = 
      { 
      
        name: "string",
        document: "string",
        salary: 12,
        role: "string",

        email:"string@gmail.com",
        password:"string",
      };

      const expectedData = 
      {
            name: "string",
            document: "string",
            salary: 12,
            role: "string",

            email:"string@gmail.com",
            password:"string",
      };

      const expectedInstanceType = Observable<MemberDomainEntity>;
      const stubGetEmail = jest.fn(() =>
          new Observable<MemberDomainEntity>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
      jest.spyOn(service, 'findOneByEmail').mockReturnValue(stubGetEmail());
  
      // Act
      const result = useCase.execute(_id);
  
      // Assert
      expect(service.findOneByEmail).toHaveBeenCalledWith(_id);
      expect(result).toBeInstanceOf(expectedInstanceType);
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
        },
        complete: () => done(),
      });
    });
  });
  