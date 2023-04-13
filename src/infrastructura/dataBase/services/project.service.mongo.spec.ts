
import { ProjectMongoService } from './project.service.mongo';
import { ProjectRepository } from '../repositories/project.intrastructura.repositoy.data-base';
import { ProjectSchema } from '../schema/project.shema.infrastructura.data-base';

import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { Types } from 'mongoose';
describe('ProjectMongoService', () => {
  let MongoService: ProjectMongoService;
  let Repository: ProjectRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectMongoService,
        {
          provide: ProjectRepository,
          useValue: {
            register: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            
          },
        },
      ],
    }).compile();
    MongoService = app.get<ProjectMongoService>(ProjectMongoService);
    Repository = app.get<ProjectRepository>(ProjectRepository);
  });

  it('should to be defined', () => {
    expect(MongoService).toBeDefined();
    expect(Repository).toBeDefined();
  });

    describe('findOneBy', () => {
      it('return project', (done) => {
         //Arrange
      const project = "64331da60df2facaa291b6a9"

      const mockData =(
        {
          _id : "64331da60df2facaa291b6a9",
          name: "string",
          dataExpiration: "string",
          progress: "string",
          priority: "string",
        }
      );
      const expected =(
        {
            _id : "64331da60df2facaa291b6a9",
            name: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
       }
     );
       jest.spyOn(Repository, 'findOneBy').mockReturnValue(mockData as any);

       //Act
       const result = MongoService.findOneBy(project);

       //Assert

      
        expect(result).toEqual(expected);
        expect(Repository.findOneBy).toHaveBeenCalled();
        done();
      
      


     });
   });

  
   it('Register return  "Observable<memberChema>"', async () =>  {
     //Arrange

     const data : ProjectSchema=(
       {
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
       }
     );

     const mockData =(
       {
            _id : "64331da60df2facaa291b6a9",
            name: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
       }
     );
  

     const expected =(
       {
            _id : "64331da60df2facaa291b6a9",
            name: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
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
       const data : ProjectSchema=(
         {
            name: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
         }
       );
  
       const mockData =(
         {
           _id : "6425e193cc50b70709e09bfe",
           name: "string",
           dataExpiration: "string",
           progress: "string",
           priority: "string",
         }
       );
    
  
       const expected =(
         {
            _id : "6425e193cc50b70709e09bfe",
            name: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
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