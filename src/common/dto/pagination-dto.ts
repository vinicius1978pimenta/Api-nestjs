import { Type } from "class-transformer"
import { IsInt, IsOptional, Max, Min, min } from "class-validator"


    export class PaginationDto{
        @IsInt()
        @Type(()=> Number)
        @IsOptional()
        @Max(10)
        @Min(1)
        limit : number


        @IsInt()
        @Type(()=> Number)
        @IsOptional()
        @Max(10)
        @Min(1)           
        offset : number


    }