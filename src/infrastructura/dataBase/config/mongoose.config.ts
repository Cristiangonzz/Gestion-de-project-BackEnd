import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";


@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

  constructor(private readonly configService: ConfigService){}
    
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb+srv://cristianuruuy:1234@cluster0.tmv8fk5.mongodb.net/test',//tenog que hacer una nueva base de datos 
      //uri: this.configService.get('MONGO_URI'),
    };
  }
}