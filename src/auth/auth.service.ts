import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { UserRepository } from './users.repository';
import { bcrypt } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Jwtpayload } from './jwt-payload.interface';
// import { accessToken } from 'jsonwebtoken'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signup(authCredentailsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createuser(authCredentailsDto);
  }
  async signin(
    authCredentailsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentailsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: Jwtpayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('please check your login credentails');
    }
  }
}
