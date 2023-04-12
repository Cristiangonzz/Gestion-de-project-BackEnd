import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";


@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

  constructor(private readonly configService: ConfigService){}
    
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: "mongodb://mongo:QSoZNFJ15xwesJlbwEPJ@containers-us-west-4.railway.app:5637",
      dbName: "gestion",
      }
    };
  }