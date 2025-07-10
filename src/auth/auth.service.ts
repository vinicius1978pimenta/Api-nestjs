import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { SingInDto } from "./dto/singin.dto";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "./config/jwt.config";
import { HashingServiceProtocol } from "./hash/hashing.service";
import { ConfigType } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private hashservice: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtconfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
  ) {}

  async authenticate(signInDto: SingInDto) {
    const user = await this.prisma.users.findFirst({
      where: { email: signInDto.email }
    });

    if (!user) {
      throw new HttpException('Falha ao fazer login', HttpStatus.UNAUTHORIZED);
    }

    const passwordValid = await this.hashservice.compare(
      signInDto.passoword, 
      user.passowordHash   
    );

    if (!passwordValid) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtconfiguration.secret,
        expiresIn: this.jwtconfiguration.ttl,
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }

  signOut() {
    
    return { message: 'Logout realizado com sucesso.' };
  }
}
