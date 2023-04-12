import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ProjectSchema } from "../../dataBase/schema/project.shema.infrastructura.data-base";

export class CreateProjectDto extends ProjectSchema{
    
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