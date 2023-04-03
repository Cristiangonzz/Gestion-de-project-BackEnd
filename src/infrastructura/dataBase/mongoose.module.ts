import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose.config';
import { ConfigService } from '@nestjs/config';
import { TeamSchema, teamSchemaFactory } from './schema/team.shema.infrastructura.data-base';
import { TaskSchema, taskSchemaFactory } from './schema/task.shema.infrastructura.data-base';
import { MemberSchema, memberSchemaFactory } from './schema/member.shema.infrastructura.data-base';
import { ProyectSchema, proyectSchemaFactory } from './schema/proyect.shema.infrastructura.data-base';
import { CollaborationSchema, collaborationSchemaFactory } from './schema/collaboration.shema.infrastructura.data-base';
import { CollaborationRepository } from './repositories/collaboration.intrastructura.repositoy.data-base';
import { MemberRepository } from './repositories/member.intrastructura.repositoy.data-base';
import { ProyectRepository } from './repositories/proyect.intrastructura.repositoy.data-base';
import { TaskRepository } from './repositories/task.intrastructura.repositoy.data-base';
import { TeamRepository } from './repositories/team.intrastructura.repositoy.data-base';
import { CollaborationMongoService } from './services/collaboration.service.mongo';
import { MemberMongoService } from './services/member.service.mongo';
import { ProyectMongoService } from './services/proyect.service.mongo';
import { TaskMongoService } from './services/task.service.mongo';
import { TeamMongoService } from './services/team.service.mongo';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),

    MongooseModule.forFeature([
      {name:TeamSchema.name , schema: teamSchemaFactory },
      {name:TaskSchema.name , schema: taskSchemaFactory }, 
      {name:MemberSchema.name , schema: memberSchemaFactory }, 
      {name:ProyectSchema.name , schema: proyectSchemaFactory }, 
      {name:CollaborationSchema.name , schema: collaborationSchemaFactory }, 
    ])
  ],
  controllers: [],
  providers: [
    MongooseConfigService,
    ConfigService,

    TeamMongoService,
    TaskMongoService,
    CollaborationMongoService,
    ProyectMongoService,
    MemberMongoService,

    CollaborationRepository,
    ProyectRepository,
    MemberRepository,
    TaskRepository,
    TeamRepository,
  ],
  exports: [
    ConfigService,


    MongooseModule,
    MongooseConfigService,

    TeamMongoService,
    TaskMongoService,
    CollaborationMongoService,
    ProyectMongoService,
    MemberMongoService,
    
    TeamRepository,
    CollaborationRepository,
    ProyectRepository,
    MemberRepository,
    TaskRepository,

  ],
})
export class MongoModule {}
