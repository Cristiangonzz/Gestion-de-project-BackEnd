import { IsEmail, IsString } from "class-validator";
import { PersonaSchema } from "../dataBase/schema/persona.shema";
import { ApiProperty } from "@nestjs/swagger";

export class RegistrarPersonaDto extends PersonaSchema{
    @ApiProperty()
    @IsString()
    nombre: string;
    
    @ApiProperty()
    @IsEmail()
    mail: string;

    @ApiProperty()
    @IsString()
    clave: string;
}