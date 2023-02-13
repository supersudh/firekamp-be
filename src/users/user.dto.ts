import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateFavoriteBookDto {
  @IsString()
  bookId: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  genre: string;

  @IsString()
  image: string;
  
  user: number;
}
