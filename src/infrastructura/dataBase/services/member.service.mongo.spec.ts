
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { Types } from 'mongoose';
import { MemberMongoService } from './member.service.mongo';
import { MemberRepository } from '../repositories/member.intrastructura.repositoy.data-base';
import { MemberSchema } from '../schema/member.shema.infrastructura.data-base';


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


  //  describe('findOneBy', () => {
  //    it('return member', (done) => {
  //      // //Arrange
  //    const member = "64331da60df2facaa291b6a9"

  //    const mockData =(
  //      {
  //        _id : "64331da60df2facaa291b6a9",
  //        name: "string",
  //        document: "string",
  //        salary: 12,
  //        role: "string",

  //        email:"email@gmail.com",
  //        password:"string",
  //      }
  //    );
  //    const expected =(
  //      {
  //       _id : "64331da60df2facaa291b6a9",
  //       name: "string",
  //       document: "string",
  //       salary: 12,
  //       role: "string",
    
  //       email:"email@gmail.com",
  //       password:"string",
  //     }
  //   );
  //     jest.spyOn(MongoService, 'findOneBy').mockReturnValue(mockData as any);

  //     //Act
  //     const result = Repository.findOneBy(member);

  //     //Assert

  //     result.subscribe({
  //       next: (member) => expect(member).toEqual(expected),
  //       complete: () => { 
  //         done();
  //       },
  //     });
  //   });
  // });

  
  // it('Register return  "Observable<memberChema>"', async () =>  {
  //   //Arrange

  //   const data : MemberSchema=(
  //     {
  //       name: "string",
  //       document: "string",
  //       salary: 12,
  //       role: "string",
    
  //       email:"email@gmail.com@gmail.com",
  //       password:"string",
  //     }
  //   );

  //   const mockData =(
  //     {
  //       _id : "64331da60df2facaa291b6a9",
  //       name: "string",
  //       document: "string",
  //       salary: 12,
  //       role: "string",
    
  //       email:"email@gmail.com",
  //       password:"string",
  //     }
  //   );
  

  //   const expected =(
  //     {
  //       _id : "64331da60df2facaa291b6a9",
  //       name: "string",
  //       document: "string",
  //       salary: 12,
  //       role: "string",
    
  //       email:"email@gmail.com",
  //       password:"string",
  //     }
  //   );
   


  //   jest.spyOn(MongoService, 'register').mockReturnValue(of(mockData) as any);

  //   //Act
  //   const result = Repository.register(data);

  //   //Assert
  //   expect(await lastValueFrom(result)).toEqual(expected);
  //   expect(MongoService.register).toHaveBeenCalled();
  // });


  // describe('update', () => {

  //   it('update tiene que retornar "Observable<memberChema>"', async () =>  {
  //     //Arrange
  
  //     const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
  //     const data : MemberSchema=(
  //       {
  //         name: "string",
  //       document: "string",
  //       salary: 12,
  //       role: "string",
    
  //       email:"email@gmail.com",
  //       password:"string",
  //       }
  //     );
  
  //     const mockData =(
  //       {
  //         _id : "6425e193cc50b70709e09bfe",
  //         name: "string",
  //         document: "string",
  //         salary: 12,
  //         role: "string",
      
  //         email:"email@gmail.com",
  //         password:"string",
  //       }
  //     );
    
  
  //     const expected =(
  //       {
  //         _id : "6425e193cc50b70709e09bfe",
  //         name: "string",
  //         document: "string",
  //         salary: 12,
  //         role: "string",
      
  //         email:"email@gmail.com",
  //         password:"string",
  //       }
  //     );
     
  
  
  //     jest.spyOn(MongoService, 'update').mockReturnValue(of(mockData) as any);
  
  //     //Act
  //     const result = Repository.update(_id.toString(),data);
  
  //     //Assert
  //     expect(await lastValueFrom(result)).toEqual(expected);
  //     expect(MongoService.update).toHaveBeenCalled();
  //   });
  // });


  
  // describe('delete', () => {

  //   it('delete return  "Observable<boolean>"', async () =>  {
  //     ////Arrange
  
  //     const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
  //     const mock  : boolean = true;
  
      
  
  //     const expected : boolean = true;
     
  
  
  //     jest.spyOn(MongoService, 'delete').mockReturnValue(of(mock) as any);
  
  //     ////Act
  //     const result = Repository.delete(_id.toString());
  
  //     // //Assert
  //     expect(await lastValueFrom(result)).toEqual(expected);
  //     expect(MongoService.delete).toHaveBeenCalled();
  //   });
  // });



  
});