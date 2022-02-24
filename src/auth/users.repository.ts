import {
  ConflictException,
  InternalServerErrorException,
  // NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
// import { AuthCredentialsDto } from './dto/auth-credentails.dto';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createuser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    // const salt = await bcrypt.genSalt();
    // const hashedpassword = await bcrypt.hash(password, salt);
    console.log('salt', salt);
    console.log('password', password);
    const user = this.create({
      username,
      password: hashedpassword,
    });
    try {
      await this.save(user);
      console.log(user);
    } catch (error) {
      //   console.log(typeof error.code);

      if (error.code == '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
      console.log(error.code);
    }
    // await this.save(user);
  }
}
