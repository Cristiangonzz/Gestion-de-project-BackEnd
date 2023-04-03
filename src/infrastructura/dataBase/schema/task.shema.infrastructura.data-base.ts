import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';


@Schema({collection: 'Task',versionKey: false})
/* A class that represents a person. */
export class TaskSchema extends TaskDomainEntity {
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
      description: string;
    
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
export type taskDocument = HydratedDocument<TaskSchema>;

/* Creating a schema factory for the taskSchema class. */
export const taskSchemaFactory = SchemaFactory.createForClass(TaskSchema);