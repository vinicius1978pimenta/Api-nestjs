import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entites';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpDateTaskDto } from './dto/update-task-dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

 async findAll(paginationDto?: PaginationDto) {
  const { limit = 10, offset = 0 } = paginationDto || {};

  const allTasks = await this.prisma.task.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  return allTasks;
}


  // Retorna uma tarefa pelo ID
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  // Cria uma nova tarefa
 async createTask(createTaskDto: CreateTaskDto) {
  const newTask = await this.prisma.task.create({
    data: {
      name: createTaskDto.name,
      description: createTaskDto.description,
      completed: false,
      user: {
        connect: {
          id: createTaskDto.userId,
        },
      },
    },
  });

  return newTask;
}




 // Atualiza uma tarefa pelo ID
async update(updateTaskDto: UpDateTaskDto, id: number) {
  const findTask = await this.prisma.task.findUnique({
    where: { id },
  });

  if (!findTask) {
    throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
  }

  const updatedTask = await this.prisma.task.update({
    where: { id },
    data: {
      name: updateTaskDto.name ?? findTask.name,
      description: updateTaskDto.description ?? findTask.description,
      completed : updateTaskDto?.completed ?? findTask.completed
    },
  });

  return updatedTask;
}


  // Deleta uma tarefa pelo ID
  async deleteTask(id: number) {
    const findTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!findTask) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Tarefa deletada com sucesso' };
  }
}
