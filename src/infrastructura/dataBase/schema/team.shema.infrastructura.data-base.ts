import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TeamDomainEntity } from '../../../domain/entities/team.entity.domain';


@Schema({collection: 'Team',versionKey: false})
/* A class that represents a person. */
export class TeamSchema extends TeamDomainEntity {
  @Prop({
      type: String,
      index: true,
      required: true,
  })
  name: string;

  @Prop({
      type: [String],
      index: true,
    })
    member: string[];
    
    @Prop({
        type: [String],
        index: true,
    })
    task: string[];

    @Prop({
        type: [String],
        index: true,
    })
    collaboration: string[];
    
    @Prop({
        type: String,
        index: true,
    })
    proyect: string;

    
}


/**
 * define la forma en que los documentos deben ser organizados dentro de una colección.
 * hidrata el esquema ya definido de nodejs y mongoose para que sea como un documento de mongoDB
 */
export type teamDocument = HydratedDocument<TeamSchema>;

/* Creating a schema factory for the teamSchema class. */
export const teamSchemaFactory = SchemaFactory.createForClass(TeamSchema);