import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { bookProviders } from './book.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BooksService, ...bookProviders],
})
export class BooksModule {}
