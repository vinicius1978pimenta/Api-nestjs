import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpDateTaskDto } from './dto/update-task-dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { AdminGuards } from 'src/common/guards/admin.guards';


@Controller('tasks')

export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  
  @Get()
  @UseInterceptors(LoggerInterceptor)
  @UseInterceptors(AddHeaderInterceptor)
  @UseGuards(AdminGuards)
  findAllTasks(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.taskService.findAll(paginationDto);
  }

  @Get(':id')
  findOneTask(@Param('id',ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Post()
  @UseInterceptors(BodyCreateTaskInterceptor)
  createTask(@Body() createTaskDto: CreateTaskDto ) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto:UpDateTaskDto ) {
    return this.taskService.update(updateTaskDto, id);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
