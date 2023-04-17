import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProjectDomainEntity } from '../../../domain/entities/project.entity.domain';
import { ApiProperty } from '@nestjs/swagger';


@Schema({collection: 'Project',versionKey: false})
/* A class that represents a person. */
export class ProjectSchema extends ProjectDomainEntity {
  @Prop({
      type: String,
      index: true,
      required: true,
  })
  @ApiProperty()
  name: string;

  @Prop({
      type: String,
      index: true,
    })
    @ApiProperty()
    dataExpiration: string;
    
    @Prop({
        type: String,
        index: true,
       
    })
    @ApiProperty()
    progress: string;

    @Prop({
        type: String,
        index: true,
       
    })
    @ApiProperty()
    priority: string;

}
/**
 * define la forma en que los documentos deben ser organizados dentro de una colección.
 * hidrata el esquema ya definido de nodejs y mongoose para que sea como un documento de mongoDB
 */
export type ProjectDocument = HydratedDocument<ProjectSchema>;

/* Creating a schema factory for the projectSchema class. */
export const ProjectSchemaFactory = SchemaFactory.createForClass(ProjectSchema);