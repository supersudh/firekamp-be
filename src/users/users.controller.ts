import {
  Body,
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateFavoriteBookDto, CreateUserDto } from './user.dto';

import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { BooksService } from 'src/books/books.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private bookService: BooksService,
  ) { }

  @Get('/')
  async getUsers() {
    const allUsers = await this.usersService.findAll();
    return allUsers;
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    const registeredUser = await this.usersService.create(
      body.fullName,
      body.email,
      body.password,
    );
    return registeredUser;
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() body: any) {
    console.log(body);
    const validatedUser = await this.usersService.validateUser(
      body.email,
      body.password,
    );

    if (!validatedUser) {
      throw new UnauthorizedException();
    }

    const tokenObj = this.usersService.login(validatedUser);
    return tokenObj;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    const currentUser = await this.usersService.findByEmail(req.user.email);
    return currentUser;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/favorite_book')
  async favoriteBook(@Request() req, @Body() body: CreateFavoriteBookDto) {
    try {
      if (!req.user) {
        throw new UnauthorizedException();
      }
      body.user = Number(req.user.userId);
      const fbook = await this.bookService.create(body);
      return fbook;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/unfavorite_book')
  async unfavoriteBook(@Request() req, @Body() body) {
    try {
      if (!req.user) {
        throw new UnauthorizedException();
      }
      const internalBookId = Number(body.id);
      await this.bookService.delete(internalBookId);
    } catch (error) {
      throw error;
    }
  }
}
