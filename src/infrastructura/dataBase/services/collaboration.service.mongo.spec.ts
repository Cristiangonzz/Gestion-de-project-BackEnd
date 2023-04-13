
import { CollaborationMongoService } from './collaboration.service.mongo';
import { CollaborationRepository } from '../repositories/collaboration.intrastructura.repositoy.data-base';
import { CollaborationSchema } from '../schema/collaboration.shema.infrastructura.data-base';

import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { Types } from 'mongoose';

describe('collaborationMongoService', () => {
  let MongoService: CollaborationMongoService;
  let Repository: CollaborationRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CollaborationMongoService,
        {
          provide: CollaborationRepository,
          useValue: {
            register: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            
          },
        },
      ],
    }).compile();
    MongoService = app.get<CollaborationMongoService>(CollaborationMongoService);
    Repository = app.get<CollaborationRepository>(CollaborationRepository);
  });

  it('should to be defined', () => {
    expect(MongoService).toBeDefined();
  });


  describe('findOneBy', () => {
    it('return collaboration', (done) => {
      // //Arrange


    const collaboration = "64331da60df2facaa291b6a9"
    
    const mockData =(
      {
        _id : "64331da60df2facaa291b6a9",
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
      }
    );
  

    const expected =(
      {
        _id : "64331da60df2facaa291b6a9",
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
      }
    );
      jest.spyOn(Repository, 'findOneBy').mockReturnValue(of(mockData) as any);

      // //Act
      const result = MongoService.findOneBy(collaboration);

      // //Assert

      result.subscribe((result) => {
        console.log(result);
        expect(result).toEqual(expected);
        expect(Repository.findOneBy).toHaveBeenCalled();
        done();
      }
      );

      
    
    });

  });

   it('Register return  "Observable<collaborationChema>"', async () =>  {
      //Arrange

     const data : CollaborationSchema=(
       {
         comment: "string",
         notification: "string",
         progress: "string",
         performence: "string",
       }
     );

     const mockData =(
       {
         _id : "64331da60df2facaa291b6a9",
         comment: "string",
         notification: "string",
         progress: "string",
         performence: "string",
       }
     );
  

     const expected =(
       {
         _id : "64331da60df2facaa291b6a9",
         comment: "string",
         notification: "string",
         progress: "string",
         performence: "string",
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

     it('update tiene que retornar "Observable<collaborationChema>"', async () =>  {
        //Arrange
  
       const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
       const data : CollaborationSchema=(
         {
           comment: "string",
           notification: "string",
           progress: "string",
           performence: "string",
         }
       );
  
       const mockData =(
         {
           _id : "6425e193cc50b70709e09bfe",
           comment: "string",
           notification: "string",
           progress: "string",
           performence: "string",
         }
       );
    
  
       const expected =(
         {
           _id : "6425e193cc50b70709e09bfe",
           comment: "string",
           notification: "string",
           progress: "string",
           performence: "string",
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