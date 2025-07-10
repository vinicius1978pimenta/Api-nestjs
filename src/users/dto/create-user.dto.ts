
import{ IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from 'class-validator'


export class CreateUserDto{
@IsString()
@IsNotEmpty()
name : string

@IsString()
@IsNotEmpty()
@MinLength(6)
passoword : string

@IsString()
@IsNotEmpty()
@IsEmail()
email : string



}