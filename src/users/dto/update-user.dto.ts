import { CreateTaskDto } from "src/tasks/dto/create-task-dto";
import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";


export class UpDateUserDto extends  PartialType (CreateUserDto) {}
