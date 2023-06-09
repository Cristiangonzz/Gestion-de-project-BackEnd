import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskSchema } from "../../../infrastructura/dataBase/schema/task.shema.infrastructura.data-base";

export class CreateTaskDto extends TaskSchema{
    
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
