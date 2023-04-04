import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';


@Schema({collection: 'Member',versionKey: false})
/* A class that represents a person. */
export class MemberSchema extends MemberDomainEntity {
  @Prop({
      type: String,
      index: true,
      required: true,
  })
  name: string;

  @Prop({
      type: String,
      index: true,
      required: true,
    })
    document: string;

    @Prop({
        type: Number,
        index: true,
        required: true,
      })
      salary: number;
    
    @Prop({
        type: String,
        index: true,
    })
    role: string;

    @Prop({
      type: String,
      index: true,
      required: true,
      unique:true,
    })
    email: string;
  
  @Prop({
      type: String,
      index: true,
      required:true,
  })
  password: string;

  

}

/**
 * define la forma en que los documentos deben ser organizados dentro de una colección.
 * hidrata el esquema ya definido de nodejs y mongoose para que sea como un documento de mongoDB
 */
export type memberDocument = HydratedDocument<MemberSchema>;

/* Creating a schema factory for the memberSchema class. */
export const memberSchemaFactory = SchemaFactory.createForClass(MemberSchema);