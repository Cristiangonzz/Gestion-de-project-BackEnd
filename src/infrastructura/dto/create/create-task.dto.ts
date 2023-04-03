import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskSchema } from "src/infrastructura/dataBase/schema/task.shema.infrastructura.data-base";

export class RegisterTaskDto extends TaskSchema{
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    dataExpiration: string;

    @ApiProperty()
    @IsString()
    description: string;
    
    @ApiProperty()
    @IsString()
    progress: string;

    @ApiProperty()
    @IsString()
    priority: string;
    
}
