import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authservice.signup(authCredentialsDto);
  }
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authservice.signin(authCredentialsDto);
  }
}
