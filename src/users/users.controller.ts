import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpDateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
 constructor(private readonly usersService: UsersService) {}

 @Get(':id')
    FindOneUsers(@Param('id',ParseIntPipe) id : number){
    return this.usersService.findOne(id)
 }
 @Post()
 CreateUser(@Body() CreateUserDto : CreateUserDto){
   return this.usersService.createUser(CreateUserDto) 
 }

 @Patch(':id')
  UpDateUser(@Param('id', ParseIntPipe) id: number, @Body() upDateUserDto: UpDateUserDto) {
  return this.usersService.updateUser(id, upDateUserDto);
}
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.delete(id);
}


}
