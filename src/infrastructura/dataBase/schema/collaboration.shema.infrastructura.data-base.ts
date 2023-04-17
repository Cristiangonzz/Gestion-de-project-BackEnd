import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { ApiProperty } from '@nestjs/swagger';


@Schema({collection: 'Collaboration',versionKey: false})
/* A class that represents a person. */
export class CollaborationSchema extends CollaborationDomainEntity {
  @Prop({
      type: String,
      index: true,
      required: true,
  })
  @ApiProperty()
  comment: string;

  @Prop({
      type: String,
      index: true,
     
    })
    @ApiProperty()
    notification: string;
    
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
    performence: string;

}


/**
 * define la forma en que los documentos deben ser organizados dentro de una colección.
 * hidrata el esquema ya definido de nodejs y mongoose para que sea como un documento de mongoDB
 */
export type collaborationDocument = HydratedDocument<CollaborationSchema>;

/* Creating a schema factory for the collaborationSchema class. */
export const collaborationSchemaFactory = SchemaFactory.createForClass(CollaborationSchema);