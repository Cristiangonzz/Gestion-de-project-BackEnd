import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProyectDomainEntity } from 'src/domain/entities/proyect.entity.domain';


@Schema({collection: 'Proyect',versionKey: false})
/* A class that represents a person. */
export class ProyectSchema extends ProyectDomainEntity {
  @Prop({
      type: String,
      index: true,
      required: true,
  })
  name: string;

  @Prop({
      type: String,
      index: true,
      unique: true,
      required: true,
    })
    dataExpiration: string;
    
    @Prop({
        type: String,
        index: true,
        required: true,
    })
    progress: string;

    @Prop({
        type: String,
        index: true,
        required: true,
    })
    priority: string;

}
/**
 * define la forma en que los documentos deben ser organizados dentro de una colección.
 * hidrata el esquema ya definido de nodejs y mongoose para que sea como un documento de mongoDB
 */
export type proyectDocument = HydratedDocument<ProyectSchema>;

/* Creating a schema factory for the proyectSchema class. */
export const proyectSchemaFactory = SchemaFactory.createForClass(ProyectSchema);