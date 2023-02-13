import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
  ) { }

  async create(book, currentUserId) {
    const count = await this.bookRepository.count({
      where: {
        userId: currentUserId,
        bookId: book.bookId,
      },
    });
    if (count < 1) {
      console.log(20, { ...book, userId: currentUserId });
      return await this.bookRepository.save({ ...book, userId: currentUserId });
    }
  }

  async listByUser(userId) {
    return await this.bookRepository.find({
      where: {
        userId
      }
    });
  }

  async delete(id: number) {
    return await this.bookRepository.delete(id);
  }
}
