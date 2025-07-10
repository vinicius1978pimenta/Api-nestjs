import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpDateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService,
    private readonly hashingService : HashingServiceProtocol
  ) {}

  async findOne(id: number) {
    const user = await this.prisma.users.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        Task: true
      },
    });

    if (user) return user;

    throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
  }

  async createUser(createUserDto: CreateUserDto) {

    const passwordhash = await this.hashingService.hash(createUserDto.passoword)

    try {
      const user = await this.prisma.users.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passowordHash: passwordhash ,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return user;
    } catch (err) {
      console.error(err);
      throw new HttpException('Erro ao criar o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: number, updateUserDto: UpDateUserDto) {
  try {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    // Se a senha for enviada no update, faz o hash
    let passwordHash = user.passowordHash;
    if (updateUserDto.passoword) {
      passwordHash = await this.hashingService.hash(updateUserDto.passoword);
    }

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: {
        name: updateUserDto.name ?? user.name,
        passowordHash: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return updatedUser;
  } catch (err) {
    console.error(err);
    throw new HttpException('Erro ao atualizar o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  async delete(id: number) {
  try {
    const user = await this.prisma.users.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.prisma.users.delete({ where: { id } });

    return { message: 'Usuário excluído com sucesso!' };
  } catch (err) {
    console.error(err);
    throw new HttpException('Erro ao excluir o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  
}
