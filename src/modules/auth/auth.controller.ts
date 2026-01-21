import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/singin.dto';
import { SignupDto } from './dto/signup.dto';
import { IsPublic } from 'src/shared/decorators/isPublic';
import { NewPasswordDto } from './dto/new-password.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
interface AuthenticatedRequest extends Request {
    userId: string;
}

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @Post('signin')
    @ApiOperation({ summary: 'Login do usuário' })
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @ApiOperation({ summary: 'Registro de um novo usuário' })
    @IsPublic()
    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Alteração de senha para usuário logado' })
    @Put('change-password')
    newPassword(
        @Body() newPasswordDto: NewPasswordDto,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.authService.changePassword(newPasswordDto, req.userId);
    }
}
