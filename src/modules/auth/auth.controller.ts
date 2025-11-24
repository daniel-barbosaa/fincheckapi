import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/singin';
import { SignupDto } from './dto/signup';
import { IsPublic } from 'src/shared/decorators/isPublic';
import { NewPasswordDto } from './dto/new-password';
import { AuthGuard } from './auth.guard';
interface AuthenticatedRequest extends Request {
    userId: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @Post('signin')
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @IsPublic()
    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @UseGuards(AuthGuard)
    @Put('change-password')
    newPassword(
        @Body() newPasswordDto: NewPasswordDto,
        @Req() req: AuthenticatedRequest,
    ) {
        console.log(req);
        return this.authService.changePassword(newPasswordDto, req.userId);
    }
}
