import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NewPasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;
}
