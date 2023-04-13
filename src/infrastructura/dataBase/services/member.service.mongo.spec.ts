import { MemberMongoService } from './member.service.mongo';
import { MemberRepository } from '../repositories/member.intrastructura.repositoy.data-base';
import { MemberSchema } from '../schema/member.shema.infrastructura.data-base';



import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { Types } from 'mongoose';
describe('MemberMongoService', () => {
  let MongoService: MemberMongoService;
  let Repository: MemberRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MemberMongoService,
        {
          provide: MemberRepository,
          useValue: {
            register: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            findOneByEmail: jest.fn(),
            
          },
        },
      ],
    }).compile();
    MongoService = app.get<MemberMongoService>(MemberMongoService);
    Repository = app.get<MemberRepository>(MemberRepository);
  });

  it('should to be defined', () => {
    expect(MongoService).toBeDefined();
    expect(Repository).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('return member', (done) => {
       //Arrange
    const member = "email@gmail.com"

    const mockData =(
      {
        _id : "64331da60df2facaa291b6a9",
        name: "string",
        document: "string",
        salary: 12,
        role: "string",

        email:"email@gmail.com",
        password:"string",
      }
    );
    const expected =(
      {
       _id : "64331da60df2facaa291b6a9",
       name: "string",
       document: "string",
       salary: 12,
       role: "string",
  
       email:"email@gmail.com",
       password:"string",
     }
   );
     jest.spyOn(Repository, 'findOneByEmail').mockReturnValue(mockData as any);

     //Act
     const result = MongoService.findOneByEmail(member);

     //Assert

    
      expect(result).toEqual(expected);

      done();

   });
 });
    describe('findOneBy', () => {
      it('return member', (done) => {
         //Arrange
      const member = "64331da60df2facaa291b6a9"

      const mockData =(
        {
          _id : "64331da60df2facaa291b6a9",
          name: "string",
          document: "string",
          salary: 12,
          role: "string",

          email:"email@gmail.com",
          password:"string",
        }
      );
      const expected =(
        {
         _id : "64331da60df2facaa291b6a9",
         name: "string",
         document: "string",
         salary: 12,
         role: "string",
    
         email:"email@gmail.com",
         password:"string",
       }
     );
       jest.spyOn(Repository, 'findOneBy').mockReturnValue(mockData as any);

       //Act
       const result = MongoService.findOneBy(member);

       //Assert

      
        expect(result).toEqual(expected);
        expect(Repository.findOneBy).toHaveBeenCalled();
        done();
      
      


     });
   });

  
   it('Register return  "Observable<memberChema>"', async () =>  {
     //Arrange

     const data : MemberSchema=(
       {
         name: "string",
         document: "string",
         salary: 12,
         role: "string",
    
         email:"email@gmail.com@gmail.com",
         password:"string",
       }
     );

     const mockData =(
       {
         _id : "64331da60df2facaa291b6a9",
         name: "string",
         document: "string",
         salary: 12,
         role: "string",
    
         email:"email@gmail.com",
         password:"string",
       }
     );
  

     const expected =(
       {
         _id : "64331da60df2facaa291b6a9",
         name: "string",
         document: "string",
         salary: 12,
         role: "string",
    
         email:"email@gmail.com",
         password:"string",
       }
     );
   


     jest.spyOn(Repository, 'register').mockReturnValue(of(mockData) as any);

     //Act
     const result = MongoService.register(data);

     //Assert
     expect(await lastValueFrom(result)).toEqual(expected);
     expect(Repository.register).toHaveBeenCalled();
   });


   describe('update', () => {

     it('update tiene que retornar "Observable<memberChema>"', async () =>  {
       //Arrange
  
       const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
       const data : MemberSchema=(
         {
           name: "string",
         document: "string",
         salary: 12,
         role: "string",
    
         email:"email@gmail.com",
         password:"string",
         }
       );
  
       const mockData =(
         {
           _id : "6425e193cc50b70709e09bfe",
           name: "string",
           document: "string",
           salary: 12,
           role: "string",
      
           email:"email@gmail.com",
           password:"string",
         }
       );
    
  
       const expected =(
         {
           _id : "6425e193cc50b70709e09bfe",
           name: "string",
           document: "string",
           salary: 12,
           role: "string",
      
           email:"email@gmail.com",
           password:"string",
         }
       );
     
  
  
       jest.spyOn(Repository, 'update').mockReturnValue(of(mockData) as any);
  
       //Act
       const result = MongoService.update(_id.toString(),data);
  
       //Assert
       expect(await lastValueFrom(result)).toEqual(expected);
       expect(Repository.update).toHaveBeenCalled();
     });
   });


  
   describe('delete', () => {

     it('delete return  "Observable<boolean>"', async () =>  {
       //Arrange
  
       const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
       const mock  : boolean = true;
  
      
  
       const expected : boolean = true;
     
  
  
       jest.spyOn(Repository, 'delete').mockReturnValue(of(mock) as any);
  
       //Act
       const result = MongoService.delete(_id.toString());
  
        //Assert
       expect(await lastValueFrom(result)).toEqual(expected);
       expect(Repository.delete).toHaveBeenCalled();
     });
   });



  
});