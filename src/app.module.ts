import { Module } from '@nestjs/common';
import { MongoModule } from './infrastructura/dataBase/mongoose.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { CollaborationRepository } from './infrastructura/dataBase/repositories/collaboration.intrastructura.repositoy.data-base';
import { MemberRepository } from './infrastructura/dataBase/repositories/member.intrastructura.repositoy.data-base';
import { ProyectRepository } from './infrastructura/dataBase/repositories/proyect.intrastructura.repositoy.data-base';
import { TaskRepository } from './infrastructura/dataBase/repositories/task.intrastructura.repositoy.data-base';
import { TeamRepository } from './infrastructura/dataBase/repositories/team.intrastructura.repositoy.data-base';
import { CollaborationService } from './infrastructura/services/collaboration.service';
import { MemberService } from './infrastructura/services/member.service';
import { ProyectService } from './infrastructura/services/proyect.service';
import { TaskService } from './infrastructura/services/task.service';
import { TeamService } from './infrastructura/services/team.service';
import { CollaborationController } from './infrastructura/controllers/collaboration.controller';
import { MemberController } from './infrastructura/controllers/member.controller';
import { ProyectController } from './infrastructura/controllers/proyect.controller';
import { TaskController } from './infrastructura/controllers/task.controller';
import { TeamController } from './infrastructura/controllers/team.controller';

@Module({
  imports: [
    MongoModule, 
     ConfigModule.forRoot({
       isGlobal: true,
       envFilePath: join(
         process.cwd(),
         'environments',
         `.env.${process.env.SCOPE?.trimEnd()}`,
         ),
       }),
  ],
  controllers: [
    MemberController,
    TaskController,
    ProyectController,
    TeamController,
    CollaborationController,
    ],
  providers: [
  
    ConfigService,

    TeamService,
    TaskService,
    CollaborationService,
    ProyectService,
    MemberService,

    CollaborationRepository,
    ProyectRepository,
    MemberRepository,
    TaskRepository,
    TeamRepository,
  ],
})
export class AppModule {}
