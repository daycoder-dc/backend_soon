import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SingUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string = "";

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string = "";

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string = "";

  @ApiProperty({ default: "https://i.pravatar.cc/300" })
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string = "https://i.pravatar.cc/300";
}

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string = "";

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string = "";

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  remenberMe: boolean = true;
}
