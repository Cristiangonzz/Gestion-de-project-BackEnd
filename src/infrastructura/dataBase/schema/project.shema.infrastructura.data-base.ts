import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProjectDomainEntity } from '../../../domain/entities/project.entity.domain';


@Schema({collection: 'Project',versionKey: false})
/* A class that represents a person. */
export class ProjectSchema extends ProjectDomainEntity {
  @Prop({
      type: String,
      index: true,
      required: true,
  })
  name: string;

  @Prop({
      type: String,
      index: true,
    })
    dataExpiration: string;
    
    @Prop({
        type: String,
        index: true,
       
    })
    progress: string;

    @Prop({
        type: String,
        index: true,
       
    })
    priority: string;

}
/**
 * define la forma en que los documentos deben ser organizados dentro de una colección.
 * hidrata el esquema ya definido de nodejs y mongoose para que sea como un documento de mongoDB
 */
export type ProjectDocument = HydratedDocument<ProjectSchema>;

/* Creating a schema factory for the projectSchema class. */
export const ProjectSchemaFactory = SchemaFactory.createForClass(ProjectSchema);