import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './user.provider';
import { jwtConstants } from './constants';

import { DatabaseModule } from '../database/database.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { BooksModule } from 'src/books/books.module';
import { bookProviders } from 'src/books/book.provider';
import { BooksService } from 'src/books/books.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    BooksModule,
  ],
  providers: [
    ...userProviders,
    ...bookProviders,
    UsersService,
    BooksService,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  controllers: [UsersController],
})
export class UsersModule { }
