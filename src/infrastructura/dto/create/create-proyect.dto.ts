import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ProyectSchema } from "src/infrastructura/dataBase/schema/proyect.shema.infrastructura.data-base";

export class RegisterProyectDto extends ProyectSchema{
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    dataExpiration: string;
    
    @ApiProperty()
    @IsString()
    progress: string;

    @ApiProperty()
    @IsString()
    priority: string;
    
}