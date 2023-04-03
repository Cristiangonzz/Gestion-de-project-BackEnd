import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';


@Schema({collection: 'Team',versionKey: false})
/* A class that represents a person. */
export class TeamSchema extends TeamDomainEntity {
  @Prop({
      type: String,
      index: true,
      required: true,
  })
  nombre: string;

  @Prop({
      type: [String],
      index: true,
      unique: true,
      required: true,
    })
    member: string[];
    
    @Prop({
        type: [String],
        index: true,
        required: true,
    })
    task: string[];

    @Prop({
        type: String,
        index: true,
        required: true,
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